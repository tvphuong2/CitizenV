const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_tracuu');

router.use('/timKiem', Controller.timKiem);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;