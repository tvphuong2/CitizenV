const dang_nhap = require('./r_dangnhap');
const danh_sach = require('./r_danhsach');
const quan_ly = require('./r_quanly');
const tra_cuu = require('./r_tracuu');
const phieu = require('./r_phieu');
const diaphuong = require('./r_diaphuong')

// truyền vào chương trình
function route(app) {
    app.use('/danhsach', danh_sach); // với path /danhsach/... sẽ chuyển sang data_syn.js
    app.use('/quanly', quan_ly);
    app.use('/tracuu', tra_cuu);
    app.use('/phieu', phieu);
    app.use("/diaphuong", diaphuong);
    app.use('/', dang_nhap);
}
// trả về hàm vừa tạo (cái này là quy ước)
module.exports = route;