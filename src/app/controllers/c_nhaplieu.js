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
        
    }
}

module.exports = new Data;