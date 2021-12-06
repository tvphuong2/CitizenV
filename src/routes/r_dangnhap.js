const express = require('express');
const router = express.Router();

const loginController = require('../app/controllers/c_dangnhap');

router.get('/dangky', loginController.dangky);
router.post('/dangky', loginController.p_dangky);
router.get('/', loginController.index); // nếu không thêm gì tức chỉ /... thì mở login controller
router.post('/', loginController.p_dangnhap); //


module.exports = router;