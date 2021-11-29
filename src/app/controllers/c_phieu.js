class Data {
    index(req, res) {
        res.render('phieu', {layout: 'main'});
    }

    /*
    trả về phiếu trống
    input: id thôn
    */
    moi(req, res) {

    }

    /*
    trả về thông tin các thành viên của một hộ
    input: id hộ
    output: mảng thông tin các thành viên bắt đầu từ chủ hộ
    */
    chinhSuaG(req, res) {

    }

    /**
     * Xử lý thông điệp khi client submit phiếu (kiểm tra và ghi nhận)
     * input: mảng thông tin các thành viên bắt đầu từ chủ hộ
     * output: 'yes' nếu thông tin hợp lệ. Ngược lại trả về 'no'
     */
    chinhSuaP(req, res) {
        
    }
}

module.exports = new Data;