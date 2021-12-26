const m_dangnhap = require('../model/m_dangnhap');
const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Chung = require('./c_chung');

class Login{

    index(req, res) {
        delete req.session.token
        res.render('w_dangnhap', {layout: 'l_trong.hbs'}); // trả về view/dangnhap với layout là login_layout
    }

    dangky(req, res) {
        res.render('w_dangky', {layout: 'l_trong.hbs'}); //tải trang đăng ký (cái này sau sẽ xóa)
    }

    /**
     * được gọi khi submit form đăng ký (đang bị khóa)
     * input: id, password
     * output: trả về trạng thái đăng ký (thất bại hoặc thành công)
     */
    p_dangky(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.body.id);
        var password = req.body.password; //lấy id và pass từ body của req (POST)

        if (id == '' || password == '') {
            return res.status(400).json({status: "Yêu cầu không hợp lệ"});
        } else {
            bcrypt.hash(password, 10, function(err, hashedPass) { //tạo một dãy mã hóa mật khẩu nhận dược
                if (err) {
                    res.status(400).json({status: 'Mật khẩu không hợp lệ'});
                }
                m_dangnhap.taoMatKhau(id, hashedPass)
                .then(result => res.json({status: 'Thành công'}))
            })
        }
    }

    /**
     * được gọi khi submit form đăng nhập
     * input: id, password
     * output: trả về trạng thái đăng nhập (thất bại hoặc thành công)
     */
    p_dangnhap(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.body.id);
        var password = req.body.password; //nhận id và pass từ client

        if (id == "") return res.status(400).json({status: "Tên đăng nhập không hợp lệ"});
        m_dangnhap.timMatKhau(id).then(data => { // tìm mật khẩu của id
            bcrypt.compare(password, (data[0].matkhau).toString()) // so sánh mật khẩu nhận được với mk của id trong csdl (đã được mã hóa)
            .then(rs =>{
                if(!rs) return res.status(400).json({status: 'Mật khẩu sai'})

                var role = 'A1';
                if (id.length == 2) role = 'A2'
                else if (id.length == 4) role = 'A3'
                else if (id.length == 6) role = 'B1'
                else if (id.length == 8) role = 'B2' 
                var token = jwt.sign({id: id, role:role}, SECRET_KEY, {expiresIn: 60*60*4}) //mã hóa id và quyền thành token hop le trong 4 giờ với chìa là 'bimatquansu'
                req.session.token = token
                res.json({
                    status: 'thanhcong', //trả về trạng thái, id của tài khoản và token cho client
                    id: id
                })
            })
        }).catch(err =>{
            res.status(404).json({status: err})
        })
    }
}

module.exports = new Login;