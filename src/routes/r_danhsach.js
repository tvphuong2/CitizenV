const express = require('express');
const router = express.Router();

const DataController = require('../app/controllers/c_danhsach');

router.get('/chinhsua', DataController.chinhSua); // danhsach/chinhsua/
router.get('/taomoi', DataController.taoMoi); // danhsach/taomoi/
router.get('/thongke', DataController.thongKe);
router.get('/capduoi', DataController.capDuoi);
router.use('/', DataController.index);

module.exports = router;