

module.exports = {

  // GET /
  getHome: function (req, res) {
    res.render('home', {
      title: "Code of Duty",
      useTransHeader: true,
      nTournaments: 1,
      nTeams: 30,
      nPlayers: 180,
    });
  },

  // GET /about
  getAbout: function (req, res) {
    res.render('about');
  },

}