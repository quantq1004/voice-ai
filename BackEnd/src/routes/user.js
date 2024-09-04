const router = require('express').Router();
const asyncMiddleware = require('../middlewares/async');
const { loginValidate, registerValidate } = require('../validations/user');
const userController = require('../controllers/user');

/* eslint-disable prettier/prettier */
router.post('/users/register', registerValidate, asyncMiddleware(userController.register));
router.post('/users/login', loginValidate, asyncMiddleware(userController.login));

module.exports = router;
