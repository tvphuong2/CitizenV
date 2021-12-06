const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_quanly');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.get('/kttenquyen',K.kientratruycap,K.quyenA123B1, Controller.timTenQuyen);
router.post('/thaymk',K.kientratruycap,K.quyenA123B1, Controller.thayMK);
router.get('/thayquyen',K.kientratruycap,K.quyenA123B1, Controller.thayQuyen);
router.get('/capduoi',K.kientratruycap,K.quyenA123B1, Controller.capDuoi);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;