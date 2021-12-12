const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_nhaplieu');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.get('/capduoi', K.kientratruycap,K.quyenB12, Controller.capDuoi);
router.post('/chinhsua',K.kientratruycap,K.quyenB12, Controller.chinhSua);
router.get('/themnhankhau',K.kientratruycap,K.quyenB12,Controller.nhapLieu);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;