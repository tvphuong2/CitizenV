const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_quanly');

router.get('/ktquyen', Controller.ktQuyen);
router.get('/thaymk', Controller.thayMK);
router.get('/thayquyen', Controller.thayQuyen);
router.get('capduoi', Controller.capDuoi);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;