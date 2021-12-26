var m_thongke = require('../model/m_thongke');
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('w_thongke', {layout: 'l_trong'});
    }

    /**
     * trả về dữ liệu để tạo tháp tuổi
     * input: danh sách id
     */
    thapTuoi(req, res) {
        var danhsach = req.body.danhsach;
        for (var i = 0; i < danhsach.length; i++) {
            danhsach[i] = Chung.chuanHoaIDDenHo(danhsach[i]);
            if (danhsach[i] == "") return res.status(404).json({status: 'ID không tồn tại'});
        }

        m_thongke.thapTuoi(danhsach)
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * trả về dữ liệu để biểu đồ mật độ dân số
     * input: danh sách id
     */
    matDoDanSo(req, res) {
        var danhsach = req.body.danhsach;
        for (var i = 0; i < danhsach.length; i++) {
            danhsach[i] = Chung.chuanHoaIDDenHo(danhsach[i]);
            if (danhsach[i] == "") return res.status(404).json({status: 'ID không tồn tại'});
        }

        m_thongke.matDoDanSo(danhsach)
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * trả về dữ liệu để tạo biểu đồ tỉ lệ nghề
     * input: danh sách id
     */
    tiLeNghe(req, res) {
        var danhsach = req.body.danhsach;
        for (var i = 0; i < danhsach.length; i++) {
            danhsach[i] = Chung.chuanHoaIDDenHo(danhsach[i]);
            if (danhsach[i] == "") return res.status(404).json({status: 'ID không tồn tại'});
        }

        m_thongke.tiLeNghe(danhsach)
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }

    /**
     * trả về dữ liệu để tạo biểu đồ tỉ lệ tôn giáo
     * input: danh sách id
     */
    tiLeTonGiao(req, res) {
        var danhsach = req.body.danhsach;
        for (var i = 0; i < danhsach.length; i++) {
            danhsach[i] = Chung.chuanHoaIDDenHo(danhsach[i]);
            if (danhsach[i] == "") return res.status(404).json({status: 'ID không tồn tại'});
        }

        m_thongke.tiLeTonGiao(danhsach)
        .then(s => res.send(s))
        .catch(err => res.status(403).json({loi: "Truy vấn không hợp lệ"}))
    }
}

module.exports = new Data;