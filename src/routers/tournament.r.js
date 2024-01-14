const express = require('express');
const router = express.Router();

const controller = require('../controllers/tournament.c');

const { checkAdmin } = require('../utils/auth-helper');

router.get('/', controller.getTournament);

router.get('/teams', controller.getTeams);
router.get('/teams/leaderboard', controller.getTeamsLeaderboard);

router.get('/matches', controller.getMatches);

router.get('/statistics', controller.getStatistics);
router.get('/statistics/players', controller.getStatisticsPlayers);

router.get('/modifications', /*checkAdmin,*/ controller.getModifications);

module.exports = router;