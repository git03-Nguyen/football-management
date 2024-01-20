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

  // POST /create/info
  postCreate: async function (req, res, next) {
    const user = (req.isAuthenticated() ? req.user : null);
    console.log(req.body);

    const tournament = req.body;
    await TournamentModel.create(tournament);

    res.send({
      status: "success",
      message: "Tạo giải đấu thành công!",
    });
  },

  // POST /create/logo and /create/banner : after upload logo and banner
  postCreateImg: async function (req, res) {
    res.send({
      status: "success",
      message: "Tạo giải đấu thành công!",
    });
  },

};