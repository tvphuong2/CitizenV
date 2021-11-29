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

    }

    /**
     * thay đổi mk
     * input: id, mật khẩu mới(yes/no)
     * output: mất khẩu sau khi chỉnh sửa('pass'/'')
     */
    thayMK(req, res) {
        
    }

    /**
     * thay đổi quyền
     * input: id, quyền mới(yes/no)
     * output: quyền sau khi chỉnh sửa(yes/no)
     */
    thayQuyen(req, res) {

    }

    /**
     * kiểm tra quyền hiện tại của một id
     * input: id
     * output: quyền(yes/no)
     */
    ktQuyen(req, res) {

    }
}

module.exports = new Data;