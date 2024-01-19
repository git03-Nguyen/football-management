const TournamentModel = require("../models/tournament.m");

module.exports = {

  // GET /
  getHome: async function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('home', {
      title: "Trang chủ",
      useTransHeader: true,
      user: user,
      nOfTournaments: await TournamentModel.count(),
      nOfTeams: 0,
      nOfPlayers: 0,
    });
  },

  // GET /about
  getAbout: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('about', {
      title: "Giới thiệu",
      useTransHeader: false,
      user: user,
    });
  },

}