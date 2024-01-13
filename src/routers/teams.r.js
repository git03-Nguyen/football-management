const express = require('express');
const router = express.Router();

const controller = require('../controllers/teams.c');

router.get('/', controller.getTeams);

router.get('/:teamId', controller.getTeam);

router.get('/:teamId/members', controller.getTeamMembers);

router.get('/:teamId/edit',/* */ controller.getEditTeam);

module.exports = router;