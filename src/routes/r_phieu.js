const express = require('express');
const router = express.Router();

const Controller = require('../app/controllers/c_phieu');

router.get('/moi', Controller.moi);
router.get('/chinhsua', Controller.chinhSuaG);
router.post('/chinhsua', Controller.chinhSuaP);
router.use('/', Controller.index); // tương tự login.js

module.exports = router;