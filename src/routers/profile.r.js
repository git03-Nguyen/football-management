const express = require('express');
const router = express.Router();

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper');

const upload = require('../utils/multer/upload-avatar');

const controller = require('../controllers/profile.c');

router.get('/', checkAuthenticated, controller.getProfile);

router.post('/edit', checkAuthenticated, upload.single('avatar'), controller.postEditProfile);

module.exports = router;