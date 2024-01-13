const express = require('express');
const router = express.Router();

const controller = require('../controllers/management.c');

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper');

router.get('/', checkAuthenticated, controller.getTeamManagement);

router.get('/tickets', checkAdmin, controller.getTicketManagement);


module.exports = router;