const express = require('express');
const router = express.Router();

const controller = require('../controllers/tournament.c');
const uploadLogo = require('../utils/multer/upload-logo');
const uploadBanner = require('../utils/multer/upload-banner');

const { checkAdmin } = require('../utils/auth-helper');

router.get('/', controller.getTournament);

router.get('/teams', controller.getTeams);
router.get('/teams/leaderboard', controller.getTeamsLeaderboard);

router.get('/matches', controller.getMatches);
router.get('/matches/:id', controller.getMatchById);

router.get('/statistics', controller.getStatistics);
router.get('/statistics/players', controller.getStatisticsPlayers);

// admin
router.get('/modifications', checkAdmin, controller.getModifications);
router.get('/modifications/teams', checkAdmin, controller.getTeamsModifications);
router.get('/modifications/matches', checkAdmin, controller.getMatchesModifications);

router.post('/modifications/info', checkAdmin, controller.postModificationsInfo);
router.post('/modifications/logo', checkAdmin, uploadLogo.single('logo'), controller.posModificationsLogo);
router.post('/modifications/banner', checkAdmin, uploadBanner.single('banner'), controller.postModificationsBanner);

router.put('/modifications/teams/:teamId/accept', checkAdmin, controller.putModificationsTeamsAccept);
router.put('/modifications/teams/:teamId/reject', checkAdmin, controller.putModificationsTeamsReject);

router.put('/modifications/matches', checkAdmin, controller.putModificationsMatches);

router.get('/matches/:id/edit', /*checkAdmin,*/ controller.getMatchByIdEdit);
router.post('/matches/:id/edit/goals', /*checkAdmin,*/ controller.addNewGoal);
router.get('/matches/:id/edit/players', checkAdmin, controller.getMatchByIdEditPlayers);
router.get('/matches/:id/edit/tickets', checkAdmin, controller.getMatchByIdEditTickets); // => Not implemente

module.exports = router;