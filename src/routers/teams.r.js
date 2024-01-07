const express = require('express');
const router = express.Router();

const controller = require('../controllers/teams.c');

router.get('/', controller.getTeams);

module.exports = router;