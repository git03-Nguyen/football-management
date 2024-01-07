const express = require('express');
const router = express.Router();

const controller = require('../controllers/home.c');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

module.exports = router;