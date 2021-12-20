const m_nhaplieu = require('../model/m_nhaplieu');
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('nhaplieu', {layout: 'main'});
    }

    capDuoi(req, res) {
        var id = Chung.trim(req.query.id); 
        m_nhaplieu.timCapDuoi(id).then(function (s) { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
            if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
            else res.send(s); //gửi dữ liệu
        })
    }

    /**
     * Xử lý thông điệp khi client submit phiếu (kiểm tra và ghi nhận)
     * input: mảng thông tin các thành viên bắt đầu từ chủ hộ
     * output: 'yes' nếu thông tin hợp lệ. Ngược lại trả về 'no'
     */
    chinhSua(req, res) {
        var id = Chung.chuanHoaIDDenHo(req.body.id);
        if (id == "") return res.status(404).json({status: 'ID không tồn tại'});
        var tenho = req.body.tenho.trim();
        var cacthanhvien = JSON.parse(req.body.cacthanhvien.trim())
        .catch(err => res.status(403).json({loi: "Yêu cầu sai định dạng"}))
        console.log(cacthanhvien);

        Chung.gioiHanQuyen(req.user, id)
        .then(id => m_nhaplieu.chinhSua(id, tenho, cacthanhvien))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    themHo(req, res) {
        var idthon = Chung.chuanHoaIDDenThon(req.body.idthon);
        if (idthon == "") return res.status(404).json({status: 'ID không tồn tại'});
        var tenho = req.body.tenho.trim();
        var cacthanhvien = req.body.cacthanhvien;
        var sothanhvien = cacthanhvien.length;

        Chung.gioiHanQuyen(req.user, idthon)
        .then(id => m_nhaplieu.themHo(tenho, id, sothanhvien))
        .then(idho => m_nhaplieu.thayDoiNhanKhau(idho, cacthanhvien))
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    suaHo(req, res) {
        var idho = Chung.chuanHoaIDDenHo(req.body.idho);
        if (idho == "") return res.status(404).json({status: 'ID không tồn tại'});
        var tenho = req.body.tenho.trim();
        var cacthanhvien = req.body.cacthanhvien;
        var sothanhvien = cacthanhvien.length;

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

    nhapLieu(req,res) {
        var list_send = req.query.list_send;
        m_nhaplieu.nhapLieu(list_send).then(function (s) { 
            if (s=="") res.status(403).json({status: 'mã không hợp lệ'})
            else res.send(s);
        })
    }
}

module.exports = new Data;