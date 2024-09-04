const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const provinceController = require('../controllers/province');
const { auth } = require('../middlewares/auth');

/* eslint-disable prettier/prettier */
router.get('/provinces', auth, asyncMiddleware(provinceController.getProvinces));
/* eslint-enable prettier/prettier */

module.exports = router;
