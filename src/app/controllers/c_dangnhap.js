const m_dangnhap = require('../model/m_dangnhap');
const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Chung = require('./c_chung');

class Login{

    index(req, res) {
        res.render('dangnhap', {layout: 'login_layout'}); // trả về view/dangnhap với layout là login_layout
    }

    dangky(req, res) {
        res.render('dangky', {layout: 'login_layout'}); //tải trang đăng ký (cái này sau sẽ xóa)
    }

    p_dangky(req, res) {
        var id = Chung.trim(req.body.id);
        var password = req.body.password; //lấy id và pass từ body của req (POST)
        if (id == '' || password == '') {
            res.status(400).json({status: 'Request không hợp lệ'});
        }

        m_dangnhap.timMatKhau(id).then(data => { // id nào cũng có mk mặc định nên nếu như trả về trống tức ko có id
            if (data == '') {
                res.status(404).json({status: 'Không tìm thấy ID'});
            } else {
                bcrypt.hash(password, 10, function(err, hashedPass){ //tạo một dãy mã hóa mật khẩu nhận dược
                    if (err) {
                        res.status(400).json({status: 'Mật khẩu không hợp lệ'});
                    }
                    m_dangnhap.taoMatKhau(id, hashedPass).then(result => { // đưa mật khẩu vào trong csdl của id đó
                        res.json({status: result});
                    })
                })
            }
        }) 
    }

    p_dangnhap(req, res) {
        var id = Chung.trim(req.body.id);
        var password = req.body.password; //nhận id và pass từ client
        var role = 'A1';
        m_dangnhap.timMatKhau(id).then(data => { // tìm mật khẩu của id
            if(data == '') return res.status(404).json({status: 'không tồn tại tài khoản'})
            
            bcrypt.compare(password, (data[0].matkhau).toString()) // so sánh mật khẩu nhận được với mk của id trong csdl (đã được mã hóa)
            .then(rs =>{
                if(!rs) return res.status(400).json({status: 'Mật khẩu sai'})

                if (id.length == 2) role = 'A2'
                else if (id.length == 4) role = 'A3'
                else if (id.length == 6) role = 'B1'
                else if (id.length == 8) role = 'B2' 
                var token = jwt.sign({id: id, role:role}, SECRET_KEY, {expiresIn: 60*30}) //mã hóa id và quyền thành token hop le trong 30phut với chìa là 'bimatquansu'
                res.json({
                    status: 'thanhcong', //trả về trạng thái, id của tài khoản và token cho client
                    id: id,
                    token: token
                })
            })            
        }).catch(err =>{
            res.status(404).json({status: err})
        })
    }

    
}

module.exports = new Login;