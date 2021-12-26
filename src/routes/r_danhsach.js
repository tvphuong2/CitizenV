const express = require('express');
const router = express.Router();

const DataController = require('../app/controllers/c_danhsach');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.get('/chinhsua',K.quyenA123B1, DataController.chinhSua); // danhsach/chinhsua/
router.get('/taomoi',K.quyenA123B1, DataController.taoMoi); // danhsach/taomoi/
router.get('/xoa',K.quyenA123B1, DataController.xoa);
router.get('/danhsachnhankhau', DataController.danhSachNhanKhau);
router.get('/thongtin', DataController.thongTin);
router.get('/capduoi', DataController.capDuoi);
router.get('/timten', DataController.timTen);
router.get('/timtiendo', DataController.timTienDo);
router.get('/timtencapduoi', DataController.timTenCapDuoi);
router.use('/', DataController.index);

module.exports = router;