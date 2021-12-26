const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_thongke');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.post('/thaptuoi', Controller.thapTuoi);
router.post('/matdodanso', Controller.matDoDanSo);
router.post('/tilenghe', Controller.tiLeNghe);
router.post('/tiletongiao', Controller.tiLeTonGiao);
router.use('/', Controller.index);

module.exports = router;