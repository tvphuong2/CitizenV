const dang_nhap = require('./r_dangnhap');
const danh_sach = require('./r_danhsach');
const quan_ly = require('./r_quanly');
const tra_cuu = require('./r_tracuu');
const nhap_lieu = require('./r_nhaplieu');

// truyền vào chương trình
function route(app) {
    app.use('/danhsach', danh_sach); // với path /danhsach/... sẽ chuyển sang data_syn.js
    app.use('/quanly', quan_ly);
    app.use('/tracuu', tra_cuu);
    app.use('/nhaplieu', nhap_lieu);
    app.use('/', dang_nhap);
}
// trả về hàm vừa tạo (cái này là quy ước)
module.exports = route;