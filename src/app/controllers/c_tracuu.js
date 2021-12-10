var m_tracuu = require('../model/m_tracuu');
const Chung = require('./c_chung');

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
        var cmnd = Chung.trim(req.query.cmnd);
        var diaphuong = Chung.trim(req.query.diaphuong);
        var hoten = Chung.trim(req.query.hoten);

        Chung.gioiHanQuyen(req.user, diaphuong).then(id =>{
            m_tracuu.timKiem(cmnd, hoten,id).then(function (s) { //gọi hàm timcapduoi trong model/chung.js, gửi dữ liệu sau khi hàm này được hoàn thành
                if (s=="") res.status(400).json({status: 'thông tin điền không hợp lệ'})
                else res.send(s); //gửi dữ liệu
            })
        }).catch(err =>{
            res.status(403).json({status: err})
        })
    }
}

module.exports = new Data;