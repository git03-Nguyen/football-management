const express = require('express');
const router = express.Router();

const { checkAdmin } = require('../utils/auth-helper');
const { checkNoTournament } = require('../utils/tournament-helper');

const uploadLogo = require('../utils/multer/upload-logo');
const uploadBanner = require('../utils/multer/upload-banner');

const controller = require('../controllers/home.c');

router.get('/', controller.getHome);

router.get('/about', controller.getAbout);

router.get('/create', checkAdmin, checkNoTournament, controller.getCreate);
router.post('/create/info', checkAdmin, checkNoTournament, controller.postCreate);
router.post('/create/logo', checkAdmin, uploadLogo.single('logo'), controller.postCreateImg);
router.post('/create/banner', checkAdmin, uploadBanner.single('banner'), controller.postCreateImg);

module.exports = router;