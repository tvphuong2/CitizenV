const m_nhaplieu = require('../model/m_nhaplieu');
const Chung = require('./c_chung');

class Data {

    themHo(req, res) {
        var idthon = Chung.chuanHoaIDDenThon(req.body.idthon);
        var tenho = req.body.tenho.trim();
        var cacthanhvien = req.body.cacthanhvien;
        var sothanhvien = cacthanhvien.length;

        if (idthon == "" || tenho =="") return res.status(404).json({loi: 'Dữ liệu gửi đi không hợp lệ'});

        Chung.gioiHanQuyen(req.user, idthon)
        .then(id => m_nhaplieu.themHo(tenho, id, sothanhvien))
        .then(idho => m_nhaplieu.thayDoiNhanKhau(idho, cacthanhvien))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    suaHo(req, res) {
        var idho = Chung.chuanHoaIDDenHo(req.body.idho);
        var tenho = req.body.tenho.trim();
        var cacthanhvien = req.body.cacthanhvien;
        var sothanhvien = cacthanhvien.length;

        if (idho == "" || tenho == "") return res.status(404).json({loi: 'Dữ liệu gửi đi không hợp lệ'});

        Chung.gioiHanQuyen(req.user, idho)
        .then(idho => m_nhaplieu.suaHo(tenho, idho, sothanhvien))
        .then(res => m_nhaplieu.xoaNhanKhau(idho))
        .then(res => m_nhaplieu.thayDoiNhanKhau(idho, cacthanhvien))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    xoaHo(req, res) {
        var idho = Chung.chuanHoaIDDenHo(req.query.idho);
        if (idho == "") return res.status(404).json({status: 'ID không tồn tại'});

        Chung.gioiHanQuyen(req.user, idho)
        .then(idho => m_nhaplieu.xoaHo(idho))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }
}

module.exports = new Data;