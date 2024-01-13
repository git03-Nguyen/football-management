const express = require('express');
const router = express.Router();

const controller = require('../controllers/management.c');

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper');

router.get('/', checkAuthenticated, controller.getTeamManagement);


module.exports = router;