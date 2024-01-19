const express = require('express');
const router = express.Router();

const { checkAdmin } = require('../utils/auth-helper');

const controller = require('../controllers/home.c');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

router.get('/create', checkAdmin, controller.getCreate);

module.exports = router;