const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.c');
const { checkAuthenticated, checkNotAuthenticated } = require('../utils/auth-helper');

router.get('/login', checkNotAuthenticated, controller.getLogin);
router.post('/login', checkNotAuthenticated, controller.postLogin);

router.get('/register', checkNotAuthenticated, controller.getRegister);
router.post('/register', checkNotAuthenticated, controller.postRegister);
router.post('/register/check', checkNotAuthenticated, controller.postCheckRegister);

router.get('/logout', controller.getLogout);

router.get('/forgot-password', checkNotAuthenticated, controller.getForgotPassword);
router.post('/forgot-password', checkNotAuthenticated, controller.postForgotPassword);

module.exports = router;