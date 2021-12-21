const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_thongke');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.post('/thaptuoi',K.kientratruycap, Controller.thapTuoi);
router.post('/matdodanso',K.kientratruycap, Controller.matDoDanSo);
router.post('/tilenghe',K.kientratruycap, Controller.tiLeNghe);
router.post('/tiletongiao',K.kientratruycap, Controller.tiLeTonGiao);
router.use('/', Controller.index);

module.exports = router;