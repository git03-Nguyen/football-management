const express = require('express');
const router = express.Router();

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper');

const controller = require('../controllers/profile.c');

router.get('/', checkAuthenticated, controller.getProfile);

router.post('/edit', checkAuthenticated, controller.postEditProfile);

module.exports = router;