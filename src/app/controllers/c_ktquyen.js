const SECRET_KEY = 'bimatquansu'
const jwt = require('jsonwebtoken')
const m_dangnhap = require('../model/m_dangnhap');

class Token {
    kientratruycap(req, res, next) {
        if (!req.headers['authorization']) { // nếu như header trống
            return res.status(400).json('Chưa có token');
        }

        var token = req.headers['authorization'].split(' ')[1] // lấy token từ header
        if(token){ //nếu token tồn tại
            jwt.verify(token, SECRET_KEY, function(err, user){ // kiểm tra token và giải mã token với khóa 'bí mật quân sự'
                if(err) return res.status(400).json('Token không hợp lệ')

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

    quyenA123B1 (req, res, next) {
        if( ['A1','A2','A3','B1'].includes(req.role)) next() //nếu quyền của client là A123 và B thì cho phép qua
        else return res.status(401).json("Bạn không phải là A1,A2,A3,B1")
    }

    quyenB12 (req, res, next) {
        if(['B1', 'B2'].includes(req.role)) next() // tương tự
        else return res.status(401).json("Bạn không phải là B1,B2")
    }
}

module.exports = new Token;