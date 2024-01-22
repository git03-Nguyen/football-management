const TeamModel = require('../models/team.m');
const PlayerModel = require('../models/player.m');

module.exports = {

  // GET /teams
  getTeams: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const allTeams = await TeamModel.getAllCurrentTeams();
    const nPerPage = 9;
    const page = req.query.page || 1;
    const nOfPages = Math.ceil(allTeams.length / nPerPage);
    const teams = allTeams.slice((page - 1) * nPerPage, page * nPerPage);
    if (page > nOfPages) return next();
    res.render('teams/teams', {
      title: "Tất cả đội bóng",
      useTransHeader: false,
      user: user,
      nOfPages: nOfPages,
      page: page,
      teams: teams,
    });
  },

  // GET /teams/:teamId
  getTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    res.render('teams/team-info', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 0,
      user: user,
      team: team,
    });
  },

  // GET /teams/:teamId/members
  getTeamMembers: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    res.render('teams/team-members', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 1,
      user: user,
      team: team,
    });
  },

  // GET /teams/:teamId/edit
  getEditTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next(); // check if user is owner of this team, TODO: use middleware instead
    res.render('teams/team-edit', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 3,
      subSubNavigation: 0,
      user: user,
      team: team,
    });
  },

  // POST /teams/:teamId/edit
  postEditTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next(); // check if user is owner of this team, TODO: use middleware instead
    try {
      await TeamModel.updateTeam(teamId, req.body);
    } catch (err) {
      console.log(err);
      res.redirect(`/teams/${teamId}/edit`);
    }
    res.redirect(`/teams/${teamId}`);
  },

  // GET /teams/:teamId/edit/members
  getEditTeamMembers: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    res.render('teams/team-edit-members', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 3,
      subSubNavigation: 1,
      user: user,
      team: team,
    });
  },

  // POST /teams/:teamId/edit/members - to add new member
  postEditTeamMembers: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    try {
      const playerId = await PlayerModel.addNewPlayer(req.body, teamId);
      res.json({ status: 'success', playerId: playerId });
    } catch (err) {
      console.log(err);
      return res.json({ status: 'error' });
    }
  },

  // POST /teams/:teamId/edit/members/:playerId/avatar
  postUpdatePlayerAvatar: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const playerId = req.params.playerId;
    const player = await PlayerModel.getPlayer(playerId);
    if (!player) return next();
    // if (player.teamId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    res.status(200).json({ status: 'success', playerId: playerId });
  },

  // DELETE /teams/:teamId/edit/members/:playerId
  deleteTeamMember: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    const playerId = req.params.playerId;
    try {
      await TeamModel.removePlayer(teamId, playerId);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ status: 'error', msg: 'Không thể xóa cầu thủ này' });
    }
    res.status(200).json({ status: 'success' });
  },

  // GET /teams/create
  getCreateTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    res.render('teams/team-create', {
      title: "Tạo đội bóng",
      useTransHeader: true,
      user: user,
    });
  },

  // POST /teams/create-info
  postCreateTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    try {
      console.log(JSON.stringify({ ...req.body, ownerId: user.id }));
      const id = await TeamModel.createTeam({ ...req.body, ownerId: user.id });
      console.log(id);
      res.status(200).json({ status: 'success', teamId: id });
    } catch (err) {
      console.log(err);
      res.status(400).json({ status: 'error' });
    }
  },

  // POST /teams/:id/update-logo
  postUpdateLogo: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    res.status(200).json({ status: 'success', teamId: teamId });
  },

  // DELETE /teams/:teamId/delete
  deleteTeam: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    if (team.ownerId != user.id) return next();// check if user is owner of this team, TODO: use middleware instead
    try {
      await TeamModel.deleteTeam(teamId);
    } catch (err) {
      console.log(err);
      res.json({ status: 'error' });
    }
    res.json({ status: 'success' });
  },

  // GET /teams/:teamId/statistics => not implemented yet
  getTeamStatistics: async function (req, res, next) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    const team = await TeamModel.getTeam(teamId);
    if (!team) return next();
    res.render('teams/team-statistics', {
      title: team.name,
      useTransHeader: true,
      subNavigation: 2,
      user: user,
      team: team,
    });
  },



}