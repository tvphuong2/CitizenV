const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const m_dangnhap = require('../model/m_dangnhap');

class Token {
    /**
     * kiểm tra truy cập của khách, nếu hợp lệ thì cho dữ liệu đi tiếp
     */
    kientratruycap(req, res, next) {
        if (!req.session.token) {
            console.log('pip')
            return res.redirect('/');
        }
        var token = req.session.token
        if(token){ //nếu token tồn tại
            jwt.verify(token, SECRET_KEY, function(err, user){ // kiểm tra token và giải mã token với khóa 'bí mật quân sự'
                if(err) return res.status(400).json({loi: 'Token không hợp lệ'})

                m_dangnhap.timMatKhau(user.id).then(data => { //tìm xem tài khoản (được giải mã từ token) có tồn tại trong csdl ko
                    if (data == '') {
                        res.status(403).json({status: 'ID của bạn không tồn tại'});
                    } else { // gán thêm quyền và id của client cho req để sử dụng ở các controller phía sau
                        req.role = user.role
                        req.user = user.id
                        next()
                    }
                })
            })
        } else {
            return res.status(401).json("Bạn không đủ thẩm quyền")
        }
    }

    /**
     * kiểm tra khách có quyền hạn A123 và B1 không
     */
    quyenA123B1 (req, res, next) {
        if( ['A1','A2','A3','B1'].includes(req.role)) next() //nếu quyền của client là A123 và B thì cho phép qua
        else return res.status(401).json("Bạn không phải là A1,A2,A3,B1")
    }

    /**
     * kiểm tra khách có quyền hạn B12 không
     */
    quyenB12 (req, res, next) {
        if(['B1', 'B2'].includes(req.role)) next() // tương tự
        else return res.status(401).json("Bạn không phải là B1,B2")
    }
}

module.exports = new Token;