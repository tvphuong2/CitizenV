var m_tracuu = require('../model/m_tracuu');

class Data {
    index(req, res) {
        res.render('tracuu', {layout: 'main'});
    }

    /**
     * Tìm kiếm một nhóm cá nhân
     * input: cmnd, mã địa phương, họ tên
     * output: mảng các thông tin cá nhân
     */
    timKiem(req, res) {
        var cmnd = req.query.cmnd;
        var diaphuong = req.query.diaphuong;
        var hoten = req.query.hoten;

        m_tracuu.timKiem(cmnd, hoten,diaphuong).then(function (s) { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
            if (s=="") res.status(403).json({status: 'thông tin điền không hợp lệ'})
            else res.send(s); //gửi dữ liệu
        })
    }
}

module.exports = new Data;