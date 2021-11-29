class Data {
    index(req, res) {
        res.render('tracuu', {layout: 'main'});
    }

    /**
     * Tìm kiếm một nhóm cá nhân
     * input: cmnd, id tỉnh, id huyện, id xã, id thôn, tên, tuổi
     * output: mảng các thông tin cá nhân
     */
    timKiem(req, res) {
        
    }
}

module.exports = new Data;