var m_tracuu = require('../model/m_tracuu');
const Chung = require('./c_chung');

class Data {
    index(req, res) {
        res.render('w_tracuu', {layout: 'l_tracuu'});
    }

    /**
     * Tìm kiếm một nhóm cá nhân
     */
    timKiem(req, res) {
        var cmnd = req.query.cmnd.trim();
        var ten = Chung.chuanHoaTen(req.query.ten);
        var tuoi = Chung.chuanHoaSo(req.query.tuoi);
        var gioi = req.query.gioi.trim();
        var tongiao = req.query.tongiao.trim();
        var quoctich = Chung.chuanHoaTen(req.query.quoctich);
        var trinhdo = req.query.trinhdo.trim();
        var max_id = Chung.chuanHoaID(req.query.id);
        console.log("pip")

        Chung.gioiHanQuyen(req.user, max_id)
        .then(id => m_tracuu.timKiem(cmnd,ten,tuoi,gioi,tongiao,quoctich,trinhdo,id))
        .then(s =>  res.send(s))
        .catch(err => res.status(403).json({loi: "Không tìm được thông tin"}))
    }
}

module.exports = new Data;