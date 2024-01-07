const express = require('express');
const router = express.Router();

const controller = require('../controllers/tournament.c');

router.get('/', controller.getTournament);

module.exports = router;