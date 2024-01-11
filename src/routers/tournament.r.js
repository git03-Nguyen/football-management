const express = require('express');
const router = express.Router();

const controller = require('../controllers/tournament.c');

const { checkAdmin } = require('../utils/auth-helper');

router.get('/', controller.getTournament);

router.get('/teams', controller.getTeams);

router.get('/matches', controller.getMatches);

router.get('/statistics', controller.getStatistics);

router.get('/modification', checkAdmin, controller.getModification);

module.exports = router;