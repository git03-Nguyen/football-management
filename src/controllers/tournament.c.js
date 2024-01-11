function getTournament() {
  return {
    logo: '/img/tournament/logo-hdt-league.png',
    name: 'HDT League Season 1',
    isFree: true,
    nOfPlayers: 7,
    format: 'Đá vòng tròn',
    place: 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM',
    timeStart: '1/1/2024',
    timeEnd: '20/1/2024',
    nCurrentTeams: 30,
    nMaxTeams: 30,
    nViews: 234
  }
}

module.exports = {

  // GET /tournament
  getTournament: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/tournament', {
      title: "Giải đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 0,
    });
  },

  // GET /tournament/teams
  getTeams: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/teams', {
      title: "Danh sách đội",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 1,
    });
  },

  // GET /tournament/matches
  getMatches: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/matches', {
      title: "Lịch thi đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 2,
    });
  },

  // GET /tournament/statistics
  getStatistics: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/statistics', {
      title: "Thống kê",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 3,
    });
  },

  // GET /tournament/modification
  getModification: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/modification', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 4,
    });
  },

}