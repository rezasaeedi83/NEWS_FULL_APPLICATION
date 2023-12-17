const express = require('express');

const loginController = require('../controller/login');
const registerController = require('../controller/register');

const loginValidator = require('../validator/login');
const registerValidator = require('../validator/register');

const router = express.Router();

router.post(
  '/login',
  loginValidator.validate,
  loginController.doLogin
);

router.post(
  '/register',
  registerValidator.validate,
  registerController.doRegister
);

module.exports = router