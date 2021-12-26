const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_quanly');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.post('/thaymk',K.quyenA123B1, Controller.thayMK);
router.get('/thayquyen',K.quyenA123B1, Controller.thayQuyen);
router.get('/xoaquyen',K.quyenA123B1, Controller.xoaQuyen);
router.get('/tiendo',K.quyenA123B1, Controller.capNhatTienDo);
router.get('/capduoi',K.quyenA123B1, Controller.capDuoi);
router.use('/', Controller.index);

module.exports = router;