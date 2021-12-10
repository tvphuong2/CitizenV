const QuanLy = require('../model/m_quanly');
const m_dangnhap = require('../model/m_dangnhap');
const bcrypt = require('bcrypt');
const Chung = require('./c_chung');

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
        var id = Chung.trim(req.query.id);
         
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
        var id = Chung.trim(req.body.id);
        var password = req.body.password;

        Chung.gioiHanQuyen(req.user, id).then(id =>{
            if (password == "") {
                m_dangnhap.xoaMatKhau(id).then(data => {
                    res.json({status: 'Xóa mk Thành công'});
                }).catch(err =>{
                    res.status(403).json({status: err})
                })
            } else {
                bcrypt.hash(password, 10, function(err, hashedPass){
                    if (err) {
                        res.status(500).json({status: err});
                    }
                    m_dangnhap.taoMatKhau(id, hashedPass).then(result => {
                        res.json({status: "Thay Mật khẩu thành công"});
                    }).catch(err =>{
                        res.status(403).json({status: err})
                    })
                })
            }
        }).catch(err =>{
            res.status(403).json({status: err})
        })
    }

    /**
     * thay đổi quyền
     * input: id, thời gian bắt đầu và tg kết thúc
     * output: thông báo thành công/lỗi
     */
    thayQuyen(req, res) {
        var id = Chung.trim(req.query.id);
        var start = req.query.start;
        var end = req.query.end;

        Chung.gioiHanQuyen(req.user, id).then(id =>{
            QuanLy.doiQuyen(id, start, end).then(function(result) {
                res.json({status: "Thay quyền thành công"});
            })
        }).catch(err =>{
            res.status(403).json({status: err})
        })
    }

    /*
    Dóng quyền
    input: id
    output: thông báo thành công/lỗi
     */
    xoaQuyen(req, res) {
        var id = Chung.trim(req.query.id);

        Chung.gioiHanQuyen(req.user, id).then(id =>{
            QuanLy.xoaQuyen(id).then(function(result) {
                res.json(result);
            })
        }).catch(err =>{
            res.status(403).json({status: err})
        })
    }

    /* thông báo tiến dộ lên tuyến trên
    input: 1/0
    output: thông báo thành công/ lỗi
     */
    capNhatTienDo(req, res) {
        var tiendo = req.query.tiendo;
        QuanLy.capNhatTienDo(req.user, tiendo).then(function(result) {
            res.json(result);
        }). catch(err =>{
            res.status(500).json({status: err})
        })
    }

    /**
     * kiểm tra quyền hiện tại và tên của một id
     * input: id
     * output: tên và quyền của id
     */
    timTenQuyenTiendo(req, res) {
        var id = Chung.trim(req.query.id); 

        Chung.gioiHanQuyen(req.user, id).then(id =>{
            QuanLy.timTenQuyenTiendo(id).then(function (s) { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
                if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
                else res.send(s); //gửi dữ liệu
            })
        }).catch(err =>{
            res.status(403).json({status: err})
        })
    }
}

module.exports = new Data;