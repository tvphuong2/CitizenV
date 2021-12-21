const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_tracuu');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.use('/timkiem',K.kientratruycap, Controller.timKiem);
router.use('/', Controller.index);

module.exports = router;