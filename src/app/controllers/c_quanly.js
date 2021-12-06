const QuanLy = require('../model/m_quanly');
const m_dangnhap = require('../model/m_dangnhap');
const bcrypt = require('bcrypt');

class Data {
    index(req, res) {
        res.render('quanly', {layout: 'main'});
    }

    /**
     * lấy dữ liệu thống kê việc khai báo tuyến dưới
     * input: id
     * output: mảng {havepass: yes/no, id, name, aut: yes/no, progress: yes/no}
     */
    capDuoi(req, res) {
        var id = req.query.id;
         
        QuanLy.quanly(id).then(function(result) {
           res.send(result);
        })
    }

    /**
     * thay đổi mk
     * input: id, mật khẩu mới(yes/no)
     * output: mất khẩu sau khi chỉnh sửa('pass'/'')
     */
    thayMK(req, res) {
        var id = req.body.id;
        var password = req.body.password;
        if (password == "") {
            m_dangnhap.xoaMatKhau(id).then(data => {
                res.json({status: 'Xóa mk Thành công'});
            })
        } else {
            m_dangnhap.timMatKhau(id).then(data => {
                if (data == '') {
                    res.status(500).json({status: 'ID không tồn tại'});
                } else {
                    bcrypt.hash(password, 10, function(err, hashedPass){
                        if (err) {
                            res.status(500).json({status: err});
                        }
                        m_dangnhap.taoMatKhau(id, hashedPass).then(result => {
                            res.json({status: result});
                        })
                    })
                }
            }) 
        }
    }

    /**
     * thay đổi quyền
     * input: id, thời gian bắt đầu và tg kết thúc
     * output: thông báo thành công/lỗi
     */
    thayQuyen(req, res) {
        var id = req.query.id;
        var start = req.query.start;
        var end = req.query.end;
        QuanLy.doiQuyen(id, start, end).then(function(result) {
            res.json('Đổi quyền thành công');
         })
    }

    /**
     * kiểm tra quyền hiện tại và tên của một id
     * input: id
     * output: tên và quyền của id
     */
    timTenQuyen(req, res) {
        var id = req.query.id; 
        QuanLy.timTenQuyen(id).then(function (s) { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
            if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
            else res.send(s); //gửi dữ liệu
        })
    }
}

module.exports = new Data;