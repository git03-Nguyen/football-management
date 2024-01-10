module.exports = {

  // GET /
  getHome: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('home', {
      title: "Trang chủ",
      useTransHeader: true,
      // TODO: get data from database
      nTournaments: 1,
      nTeams: 30,
      nPlayers: 180,
      user: user,
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