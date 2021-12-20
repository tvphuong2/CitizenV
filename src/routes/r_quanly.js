const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_quanly');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.post('/thaymk',K.kientratruycap,K.quyenA123B1, Controller.thayMK);
router.get('/thayquyen',K.kientratruycap,K.quyenA123B1, Controller.thayQuyen);
router.get('/xoaquyen',K.kientratruycap,K.quyenA123B1, Controller.xoaQuyen);
router.get('/tiendo',K.kientratruycap,K.quyenA123B1, Controller.capNhatTienDo);
router.get('/capduoi',K.kientratruycap,K.quyenA123B1, Controller.capDuoi);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;