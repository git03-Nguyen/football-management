const express = require('express');
const router = express.Router();

const controller = require('../../controllers/auth.c');

router.get('/login', controller.getLogin);
router.post('/login', controller.postLogin);

router.get('/forgot-password', controller.getForgotPassword);

router.get('/register', controller.getRegister);
router.post('/register', controller.postRegister);

router.get('/logout', controller.getLogout);

module.exports = router;