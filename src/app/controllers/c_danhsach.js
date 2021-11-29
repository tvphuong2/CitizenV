class Data {
    index(req, res) {
        res.render('danhsach', {layout: 'main'}); // trả về vews/danhsach với layout: main
    }

    /* chỉnh sửa id và tên của một địa phương
    input old_id, new_id, new_name
    output 'no' nếu như id và name mới không bị trùng. Nếu hợp lệ trả về 'yes'
    */
    chinhSua(req, res) {

    }

    /* tạo một địa phương mới
    input new_id, new_name
    output 'no' nếu như id và name mới không bị trùng. Nếu hợp lệ trả về 'yes'
    */
    taoMoi(req, res) {

    }

    /* thống kê (để làm cuối cùng, sử dụng react)
    input: chuỗi các id cách nhau bằng dẫu cách
    output một trang mới chứa các lược đồ thống kê
    */
    thongKe(req, res) {

    }

    /* lấy các địa phương thuộc địa phương đó
    input: id
    output mảng các id địa phương
    */
    capDuoi(req, res) {
        var store = require('../model/store');
        store.getStore().then(function (s) {
            res.send(s);
        })
    }
}

module.exports = new Data;