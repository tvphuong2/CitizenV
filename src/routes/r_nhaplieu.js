const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_nhaplieu');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.post('/themho',K.quyenB12, Controller.themHo);
router.post('/suaho',K.quyenB12, Controller.suaHo);
router.get('/xoaho',K.quyenB12, Controller.xoaHo);

module.exports = router;