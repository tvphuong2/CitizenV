const dang_nhap = require('./r_dangnhap');
const danh_sach = require('./r_danhsach');
const quan_ly = require('./r_quanly');
const tra_cuu = require('./r_tracuu');
const nhap_lieu = require('./r_nhaplieu');
const thong_ke = require('./r_thongke');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

// Định tuyến
function route(app) {
    app.use('/danhsach',K.kientratruycap, danh_sach); 
    app.use('/quanly',K.kientratruycap, quan_ly);
    app.use('/tracuu',K.kientratruycap, tra_cuu);
    app.use('/nhaplieu',K.kientratruycap, nhap_lieu);
    app.use('/thongke',K.kientratruycap, thong_ke);
    app.use('/', dang_nhap);
}

module.exports = route;

/* Các file định tuyến sẽ có dạng r_ten và controllers c_ktquyen để kiểm tra truy cập cho trang web
Trong đó:
r_danhsach định tuyến các API, trang web liên quan đến quản lý danh sách địa phương (trang chủ)
r_quanly liên quan đến trang quản lý, kiểm tra tiến độ, cấp quyền và tài khoản
r_nhaplieu liên quan đến các API thêm, sửa, xóa nhân-hộ khẩu
r_tracuu liên quan đến các API và trang tìm kiếm
r_thongke liên quan đến các API và trang thống kê địa phương hoặc nhóm địa phương
r_dangnhap liên quan đến việc đăng nhập (và đăng ký với ADMIN)
*/
