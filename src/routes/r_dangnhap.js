const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/c_dangnhap');

router.use('/', loginController.index); // nếu không thêm gì tức chỉ /... thì mở login controller

module.exports = router;