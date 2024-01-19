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

  // GET /create
  getCreate: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('tournament/create', {
      title: "Tạo giải đấu",
      useTransHeader: true,
      user: user,
    });
  },

  // POST /create
  postCreate: async function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);

    const tournament = {
      name: req.body.name,
      timeStart: req.body.timeStart,
      timeEnd: req.body.timeEnd,
      place: req.body.place,
      mapURL: req.body.mapURL,
      rulesURL: req.body.rulesURL,
      nOfFollowers: req.body.nOfFollowers,
      formatId: req.body.formatId,
      maxTeams: req.body.maxTeams,
      nOfPlayers: req.body.nOfPlayers,
    };
    console.log(tournament);
    const result = await TournamentModel.create(tournament);
    res.redirect('/tournament/modifications');
  },

}