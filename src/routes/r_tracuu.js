const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_tracuu');
const K = require('../app/controllers/c_ktquyen'); // kiểm tra truy cập

router.use('/timKiem',K.kientratruycap,K.quyenA123B1, Controller.timKiem);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;