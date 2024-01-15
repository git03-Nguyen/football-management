function getTournament() {
  return {
    logo: '/img/tournament/logo-hdt-league.png',
    banner: '/img/tournament/banner-hdt-league.png',
    name: 'HDT League Season 1',
    isFree: true,
    nOfPlayers: 7,
    format: 'Đá vòng tròn',
    place: 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM',
    timeStart: '1/1/2024',
    timeEnd: '20/1/2024',
    nCurrentTeams: 30,
    nMaxTeams: 30,
    nViews: 234,
  }
}

function getGeneralStatistics() {
  return {
    topScorers: [
      { name: 'Nguyễn Tiến Thái', number: 15, teamId: 1 },
      { name: 'Thanh An Thắng', number: 22, teamId: 1 },
      { name: 'Bùi Anh Tuấn', number: 12, teamId: 1 },
    ],
    leaderboard: [
      { teamId: 1, name: 'Đội bóng 1', score: 15 },
      { teamId: 1, name: 'Đội bóng 2', score: 12 },
      { teamId: 1, name: 'Đội bóng 3', score: 10 },
      { teamId: 1, name: 'Đội bóng 4', score: 8 },
    ],
    recentSchedules: [
      { matchId: 1, teamId1: 1, teamId2: 1, name1: 'Đội bóng 7', name2: 'Đội bóng 8', time: '17:45', date: '22/12/23', isPlayed: false },
      { matchId: 2, teamId1: 1, teamId2: 1, name1: 'Đội bóng 5', name2: 'Đội bóng 6', time: '17:45', date: '22/12/23', isPlayed: false },
      { matchId: 3, teamId1: 1, teamId2: 1, name1: 'Đội bóng 3', name2: 'Đội bóng 4', time: '17:45', date: '22/12/23', isPlayed: false },
      { matchId: 5, teamId1: 1, teamId2: 1, name1: 'Đội bóng 1', name2: 'Đội bóng 2', score1: 2, score2: 1, isPlayed: true },
    ],
    totalPlayers: 180,
    totalGoals: 63,
    totalMatches: 30,
    ownGoals: 3,
    totalCards: 5,
    mostGoalsMatch: {
      matchId: 1,
      teamId1: 1,
      teamId2: 1,
      name1: 'Đội bóng 1',
      name2: 'Đội bóng 2',
      score1: 5,
      score2: 7,
    },
    rulesLink: 'https://drive.google.com/file/d/1oM7kRm2XUMQ9Wdi5Gu6dAJj_fc0umABk/preview',
    place: {
      name: 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM',
      address: '227 Nguyễn Văn Cừ, Phường 4, Quận 5, TP Hồ Chí Minh',
      embedLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.635863047679!2d106.6797512748567!3d10.762521589385393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f1bfc262bf1%3A0x4e843897f2900135!2zMjI3IMSQLiBOZ3V54buFbiBWxINuIEPhu6ssIFBoxrDhu51uZyA0LCBRdeG6rW4gNSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1704601347126!5m2!1sen!2s",
    }
  }
}

function getAllTeams() {
  return [
    // 8 teams for testing
    {
      teamId: 1,
      name: 'Đội bóng 1',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      goalDifference: 12,
      nOfOwnGoals: 0,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 2',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      nOfOwnGoals: 1,
      goalDifference: 12,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 3',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      goalDifference: 12,
      nOfOwnGoals: 0,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 4',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      goalDifference: 12,
      nOfOwnGoals: 0,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 5',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      goalDifference: 12,
      nOfOwnGoals: 0,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 6',
      nOfPlayedMatches: 5,
      nOfWins: 3,
      nOfDraws: 1,
      nOfLosses: 1,
      nOfGoals: 22,
      nOfGoalsAgainst: 10,
      goalDifference: 12,
      nOfOwnGoals: 0,
      score: 10,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    // below teams will have negative goal difference
    {
      teamId: 1,
      name: 'Đội bóng 7',
      nOfPlayedMatches: 5,
      nOfWins: 1,
      nOfDraws: 1,
      nOfLosses: 3,
      nOfGoals: 10,
      nOfGoalsAgainst: 22,
      goalDifference: -12,
      nOfOwnGoals: 0,
      score: 4,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      teamId: 1,
      name: 'Đội bóng 8',
      nOfPlayedMatches: 5,
      nOfWins: 1,
      nOfDraws: 1,
      nOfLosses: 3,
      nOfGoals: 10,
      nOfGoalsAgainst: 22,
      goalDifference: -12,
      nOfOwnGoals: 0,
      score: 4,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
  ]
}

function getMatches() {
  // examples for matches in Round Robin format
  return [
    { // round 1
      dates: [
        {
          date: '21/12/2023',
          matches: [
            { matchId: 0, teamId1: 1, teamId2: 1, name1: 'Đội bóng 1', name2: 'Đội bóng 2', time: '17:45', isPlayed: true, score1: 2, score2: 1 },
          ]
        },
        {
          date: '22/12/2023',
          matches: [
            { matchId: 1, teamId1: 1, teamId2: 1, name1: 'Đội bóng 7', name2: 'Đội bóng 8', time: '17:45', isPlayed: false },
            { matchId: 2, teamId1: 1, teamId2: 1, name1: 'Đội bóng 5', name2: 'Đội bóng 6', time: '18:45', isPlayed: false },
            { matchId: 3, teamId1: 1, teamId2: 1, name1: 'Đội bóng 3', name2: 'Đội bóng 4', time: '17:45', isPlayed: false },
          ]
        },
        {
          date: '23/12/2023',
          matches: [
            { matchId: 4, teamId1: 1, teamId2: 1, name1: 'Đội bóng 1', name2: 'Đội bóng 2', time: '17:45', isPlayed: false },
          ]
        }
      ]

    },
    { // round 2
      dates: [
        {
          date: '24/12/2023',
          matches: [
            { matchId: 5, teamId1: 1, teamId2: 1, name1: 'Đội bóng 1', name2: 'Đội bóng 2', time: '17:45', isPlayed: false },
          ]
        },
        {
          date: '25/12/2023',
          matches: [
            { matchId: 6, teamId1: 1, teamId2: 1, name1: 'Đội bóng 7', name2: 'Đội bóng 8', time: '17:45', isPlayed: false },
            { matchId: 7, teamId1: 1, teamId2: 1, name1: 'Đội bóng 5', name2: 'Đội bóng 6', time: '17:45', isPlayed: false },
            { matchId: 8, teamId1: 1, teamId2: 1, name1: 'Đội bóng 3', name2: 'Đội bóng 4', time: '17:45', isPlayed: false },
          ]
        },
      ]

    },
  ]
}

function getPlayerStatistics() {
  return [
    {
      playerId: 1,
      playerName: 'Nguyễn Tiến Thái',
      number: 15,
      teamId: 1,
      teamName: 'Đội bóng 1',
      nOfMatches: 5,
      nOfGoals: 15,
      nOfOwnGoals: 0,
      nOfDoubleKicks: 2,
      nOfHatTricks: 1,
      nOfPokers: 0,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      playerId: 2,
      playerName: 'Thanh An Thắng',
      number: 22,
      teamId: 1,
      teamName: 'Đội bóng 1',
      nOfMatches: 5,
      nOfGoals: 12,
      nOfOwnGoals: 1,
      nOfDoubleKicks: 1,
      nOfHatTricks: 0,
      nOfPokers: 0,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
    {
      playerId: 3,
      playerName: 'Bùi Anh Tuấn',
      number: 12,
      teamId: 1,
      teamName: 'Đội bóng 1',
      nOfMatches: 5,
      nOfGoals: 10,
      nOfOwnGoals: 0,
      nOfDoubleKicks: 0,
      nOfHatTricks: 0,
      nOfPokers: 0,
      nOfYellowCards: 2,
      nOfRedCards: 0,
    },
  ];
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
      stats: getGeneralStatistics(),
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
      allTeams: getAllTeams(),
      subNavigation: 1,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/teams/leaderboard
  getTeamsLeaderboard: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/teams-leaderboard', {
      title: "Bảng xếp hạng",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      teams: getAllTeams(),
      subNavigation: 1,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/matches?round=
  getMatches: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    const round = req.query.round || 1;
    const countMatches = getMatches().reduce((count, round) => {
      return count + round.dates.reduce((count, date) => {
        return count + date.matches.length;
      }, 0);
    }, 0);
    res.render('tournament/matches', {
      title: "Lịch thi đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      round: round,
      rounds: getMatches(),
      countMatches: countMatches,
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
      teams: getAllTeams(),
      subNavigation: 3,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/statistics/players
  getStatisticsPlayers: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/statistics-players', {
      title: "Thống kê",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      statistics: getPlayerStatistics(),
      subNavigation: 3,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/modifications
  getModifications: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/modifications', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 4,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/modifications/teams
  getTeamsModifications: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/modifications-teams', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      teams: getAllTeams(),
      subNavigation: 4,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/modifications/matches
  getMatchesModifications: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    res.render('tournament/modifications-matches', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      rounds: getMatches(),
      subNavigation: 4,
      subSubNavigation: 2,
    });
  },

  // GET /tournament/matches/:id
  getMatchById: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    const matchId = req.params.id;
    res.render('tournament/matches/match', {
      title: "Trận đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      // match: getMatches()[0].dates[0].matches[0],
      subNavigation: 0,
    });
  },

  // GET /tournament/matches/:id/edit
  getMatchByIdEdit: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      // match: getMatches()[0].dates[0].matches[0],
      subNavigation: 1,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/matches/:id/edit/players
  getMatchByIdEditPlayers: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit-players', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      // match: getMatches()[0].dates[0].matches[0],
      subNavigation: 1,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/matches/:id/edit/tickets => Not implement
  getMatchByIdEditTickets: function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = getTournament();
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit-tickets', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      subNavigation: 1,
      subSubNavigation: 2,
    });
  },


}