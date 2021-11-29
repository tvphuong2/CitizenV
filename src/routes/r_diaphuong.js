const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_diaphuong');

router.use('/', Controller.capduoi); // /diaphuong/
router.use('/quyen', Controller.quyen); // /diaphuong/quyen/

module.exports = router;