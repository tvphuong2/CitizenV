const QuanLy = require('../model/m_quanly');
const m_dangnhap = require('../model/m_dangnhap');
const bcrypt = require('bcrypt');
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('w_quanly', {layout: 'l_main'});
    }

    /**
     * trả về id, tên, trạng thái mật khẩu, quyền, tiến độ, ngày bắt đầu, kết thúc khai báo, ngày hiện tại
     */
    capDuoi(req, res) {
        QuanLy.capDuoi(req.user)
        .then(result => res.send(result))
        .catch(err =>res.status(403).json({loi: "Yêu cầu không hợp lệ"}))
    }

    /**
     * thay đổi quyền
     * input: id, thời gian bắt đầu và tg kết thúc
     */
    thayQuyen(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        var start = Chung.chuanHoaNgay(req.query.start);
        var end = Chung.chuanHoaNgay(req.query.end);

        if (id == "" || start == "" || end == "") return res.status(404).json({status: 'Yêu cầu không hợp lệ'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => QuanLy.timQuyen(req.user, id))
        .then(id => QuanLy.doiQuyen(id, start, end))
        .then(result => res.json({status: 'Thành công'}))
        .catch(err => res.status(403).json({loi: "Thay đổi quyền thất bại"}))
    }

    /**
     * Đóng quyền của một địa phương
     * input: id địa phương
     */
    xoaQuyen(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.query.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});

        Chung.gioiHanQuyen(req.user, id)
        .then(id => QuanLy.timQuyen(req.user, id))
        .then(id => QuanLy.xoaQuyen(id))
        .then(result => res.json(result))
        .catch(err =>res.status(403).json({status: err}))
    }

    /**
     * thay đổi mậ khẩu
     * input: id, mật khẩu
     */
    thayMK(req, res) {
        var id = Chung.chuanHoaIDDenThon(req.body.id);
        var password = req.body.password;

        Chung.gioiHanQuyen(req.user, id).then(id =>{
            if (password == "") {
                m_dangnhap.xoaMatKhau(id)
                .then(result => res.json(result))
            } else {
                bcrypt.hash(password, 10, function(err, hashedPass) {
                    if (err) res.status(500).json({loi: "Mật khẩu không hợp lệ"});

                    m_dangnhap.taoMatKhau(id, hashedPass)
                    .then(result => res.json(result))
                })
            }
        }).catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * thay đổi tiến độ của khách
     * input: tiến độ
     */
    capNhatTienDo(req, res) {
        var tiendo = req.query.tiendo;
        QuanLy.capNhatTienDo(req.user, tiendo)
        .then(id => QuanLy.timQuyen(req.user, id))
        .then(result => res.json({status: result}))
        .catch(err => res.status(500).json({status: err}))
    }
}

module.exports = new Data;