const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.c');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);

router.get('/logout', controller.getLogout);

router.get('/forgot-password', controller.getForgotPassword);
router.post('/forgot-password', controller.postForgotPassword);

module.exports = router;