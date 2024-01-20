const TeamModel = require('../models/team.m');

module.exports = {

  // GET /management
  getTeamManagement: async function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    const ownTeams = await TeamModel.getTeamsByOwner(user.id);
    res.render('management/teams', {
      title: "Quản lý đội bóng",
      useTransHeader: true,
      user: user,
      subNavigation: 0,
      teams: ownTeams,
    });
  },

  // GET /management/tickets
  getTicketManagement: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('management/tickets', {
      title: "Quản lý vé",
      useTransHeader: true,
      user: user,
      subNavigation: 1,
    });
  },


};