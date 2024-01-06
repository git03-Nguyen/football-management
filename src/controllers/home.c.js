

module.exports = {
  getHome: function (req, res) {
    res.render('home', {
      title: "Code of Duty",
      headerTrans: true,
      nTournaments: 1,
      nTeams: 30,
      nPlayers: 180,
    });
  },

  getAbout: function (req, res) {
    res.render('about');
  },
}