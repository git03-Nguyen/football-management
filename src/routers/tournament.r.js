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
router.get('/modifications/teams', /*checkAdmin,*/ controller.getTeamsModifications);
router.get('/modifications/matches', /*checkAdmin,*/ controller.getMatchesModifications);

module.exports = router;