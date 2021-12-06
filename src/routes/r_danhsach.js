const express = require('express');
const router = express.Router();

const DataController = require('../app/controllers/c_danhsach');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.get('/chinhsua',K.kientratruycap,K.quyenA123B1, DataController.chinhSua); // danhsach/chinhsua/
router.get('/taomoi',K.kientratruycap,K.quyenA123B1, DataController.taoMoi); // danhsach/taomoi/
router.get('/xoa',K.kientratruycap,K.quyenA123B1, DataController.xoa);
router.get('/thongke',K.kientratruycap,K.quyenA123B1, DataController.thongKe);
router.get('/capduoi',K.kientratruycap,K.quyenA123B1, DataController.capDuoi);
router.get('/timten',K.kientratruycap, DataController.timTen);
router.use('/', DataController.index);

module.exports = router;