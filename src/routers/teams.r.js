const express = require('express');
const router = express.Router();

const controller = require('../controllers/teams.c');
const uploadLogo = require('../utils/multer/upload-team-logo');
const uploadAvatar = require('../utils/multer/upload-player-avatar');

const { checkAuthenticated, checkAdmin } = require('../utils/auth-helper'); // TODO: checkOwnTeam

router.get('/', controller.getTeams);

router.get('/create', checkAuthenticated, controller.getCreateTeam);
router.post('/create-info', checkAuthenticated, controller.postCreateTeam);
router.post('/:teamId/update-logo', checkAuthenticated, uploadLogo.single('logo'), controller.postUpdateLogo); // TODO: checkOwnTeam

router.get('/:teamId', controller.getTeam);

router.get('/:teamId/members', controller.getTeamMembers);

router.get('/:teamId/edit', checkAuthenticated, controller.getEditTeam); // TODO: checkOwnTeam
router.post('/:teamId/edit', checkAuthenticated, uploadLogo.single('logo'), controller.postEditTeam); // TODO: checkOwnTeam

router.get('/:teamId/edit/members', checkAuthenticated, controller.getEditTeamMembers); // TODO: checkOwnTeam
router.delete('/:teamId/edit/members/:playerId', checkAuthenticated, controller.deleteTeamMember); // TODO: checkOwnTeam
router.post('/:teamId/edit/members', checkAuthenticated, controller.postEditTeamMembers); // TODO: checkOwnTeam
router.post('/:teamId/edit/members/:playerId/avatar', checkAuthenticated, uploadAvatar.single('avatar'), controller.postUpdatePlayerAvatar); // TODO: checkOwnTeam

router.delete('/:teamId/delete', checkAuthenticated, controller.deleteTeam); // TODO: checkOwnTeam

router.get('/:teamId/statistics', controller.getTeamStatistics); // Not implemented yet

module.exports = router;