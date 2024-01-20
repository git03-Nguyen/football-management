const express = require('express');
const router = express.Router();

const controller = require('../controllers/teams.c');

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper'); // TODO: checkOwnTeam

router.get('/', controller.getTeams);

router.get('/create', checkAuthenticated, controller.getCreateTeam);

router.get('/:teamId', controller.getTeam);

router.get('/:teamId/members', controller.getTeamMembers);

router.get('/:teamId/edit', checkAuthenticated, controller.getEditTeam); // TODO: checkOwnTeam
router.get('/:teamId/edit/members', checkAuthenticated, controller.getEditTeamMembers); // TODO: checkOwnTeam


router.get('/:teamId/statistics', controller.getTeamStatistics); // Not implemented yet

module.exports = router;