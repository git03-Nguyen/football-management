const TournamentModel = require('../models/tournament.m');
const TeamModel = require('../models/team.m');
const MatchModel = require('../models/match.m');
const PlayerModel = require('../models/player.m');

module.exports = {

  // GET /tournament
  getTournament: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const teams = await TeamModel.getTeamsLeaderboard();
    const matches = await MatchModel.getMatchesInTournament(tournament.id);
    // only take 5 matches the most recent (both played and not played)
    matches.sort((a, b) => {
      // use abs
      return Math.abs(new Date(b.date) - new Date(a.date));
    });

    matches.forEach(match => {
      match.name1 = teams.find(t => t.id === match.teamId1).name;
      match.name2 = teams.find(t => t.id === match.teamId2).name;
    });
    const mostGoalsMatch = matches.reduce((prev, curr) => {
      if (curr.scores1 + curr.scores2 > prev.scores1 + prev.scores2) {
        return curr;
      } else {
        return prev;
      }
    });
    const players = await PlayerModel.getPlayersStatistics(tournament.id);
    res.render('tournament/tournament', {
      title: "Giải đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: teams.length,
      teams: teams.slice(0, 5),
      matches: matches.slice(0, 5),
      stats: {
        totalPlayers: await TournamentModel.countPlayersInTournament(tournament.id),
        totalGoals: await MatchModel.getNumberOfGoalsInTournament(tournament.id),
        totalMatches: matches.length,
        ownGoals: await MatchModel.getNumberOfOwnGoalsInTournament(tournament.id),
        totalCards: await MatchModel.getNumberOfCardsInTournament(tournament.id),
        mostGoalsMatch: mostGoalsMatch,
        topScorers: players.slice(0, 3),
        // leaderboard
        // recentSchedules
      },
      subNavigation: 0,
    });
  },

  // GET /tournament/teams
  getTeams: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const teams = await TeamModel.getTeamsLeaderboard();

    res.render('tournament/teams', {
      title: "Danh sách đội",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      teams: teams,
      subNavigation: 1,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/teams/leaderboard
  getTeamsLeaderboard: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const teams = await TeamModel.getTeamsLeaderboard();
    res.render('tournament/teams-leaderboard', {
      title: "Bảng xếp hạng",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      teams: teams,
      subNavigation: 1,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/matches?round=
  getMatches: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const rounds = await MatchModel.getRoundsInTournament(tournament.id);
    const round = req.query.round || 1;
    const matches = rounds[round - 1];
    let countMatches = 0;
    for (let i = 0; i < rounds.length; i++) {
      countMatches += rounds[i].length;
    }
    // group matches by date
    const dates = [];
    const teams = await TeamModel.getAllActiveTeams();
    for (const match of matches) {
      match.name1 = teams.find(t => t.id === match.teamId1).name;
      match.name2 = teams.find(t => t.id === match.teamId2).name;
      const date = dates.find(d => d.date === match.date);
      if (!date) {
        dates.push({ date: match.date, matches: [match] });
      } else {
        date.matches.push(match);
      }
    }

    res.render('tournament/matches', {
      title: "Lịch thi đấu",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      round: round,
      rounds: rounds,
      countAllMatches: countMatches,
      dates: dates,
      subNavigation: 2,
    });
  },

  // GET /tournament/statistics
  getStatistics: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const teams = await TeamModel.getTeamsLeaderboard();
    res.render('tournament/statistics', {
      title: "Thống kê",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      teams: teams,
      subNavigation: 3,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/statistics/players
  getStatisticsPlayers: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const players = await PlayerModel.getPlayersStatistics(tournament.id);
    console.log(players);
    res.render('tournament/statistics-players', {
      title: "Thống kê",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      players: players,
      subNavigation: 3,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/modifications
  getModifications: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    res.render('tournament/modifications', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      subNavigation: 4,
      subSubNavigation: 0,
    });
  },

  // POST /tournament/modifications/info
  postModificationsInfo: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();

    const info = req.body;
    await TournamentModel.updateInfo(tournament.id, info);

    res.json({ status: 'success' });
  },

  // POST /tournament/modifications/logo
  posModificationsLogo: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    res.json({ status: 'success' });
  },

  // POST /tournament/modifications/banner
  postModificationsBanner: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    res.json({ status: 'success' });
  },

  // GET /tournament/modifications/teams
  getTeamsModifications: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const teams = await TeamModel.getAllCurrentTeams();
    // remove all teams that has no team.profile
    for (let i = 0; i < teams.length; i++) {
      if (!teams[i].profile) {
        teams.splice(i, 1);
        i--;
      }
    }

    res.render('tournament/modifications-teams', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      teams: teams,
      subNavigation: 4,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/modifications/matches
  getMatchesModifications: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const tournament = await TournamentModel.getCurrentTournament();
    const rounds = await MatchModel.getRoundsInTournament(tournament.id);
    const round = req.query.round || 1;
    const matches = rounds[round - 1];
    const teams = await TeamModel.getAllActiveTeams();
    res.render('tournament/modifications-matches', {
      title: "Chỉnh sửa",
      useTransHeader: true,
      user: user,
      tournament: tournament,
      nOfActiveTeams: await TournamentModel.countActiveTeamsInTournament(tournament.id),
      round: round,
      rounds: rounds,
      matches: matches,
      teams: teams,
      subNavigation: 4,
      subSubNavigation: 2,
    });
  },

  // GET /tournament/matches/:id
  getMatchById: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const matchId = req.params.id;
    const match = await MatchModel.getMatch(matchId);
    // match.date is yyyy-mm-dd, let convert to dd/mm/yyyy
    const date = new Date(match.date);
    match.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const teams = await TeamModel.getTeamsLeaderboard();
    match.name1 = teams.find(t => t.id === match.teamId1).name;
    match.name2 = teams.find(t => t.id === match.teamId2).name;
    res.render('tournament/matches/match', {
      title: "Trận đấu",
      useTransHeader: true,
      user: user,
      tournament: await TournamentModel.getCurrentTournament(),
      match: match,
      teams: teams.slice(0, 5),
      subNavigation: 0,
    });
  },

  // GET /tournament/matches/:id/edit
  getMatchByIdEdit: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: await TournamentModel.getCurrentTournament(),
      // match: getMatches()[0].dates[0].matches[0],
      subNavigation: 1,
      subSubNavigation: 0,
    });
  },

  // GET /tournament/matches/:id/edit/players
  getMatchByIdEditPlayers: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit-players', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: await TournamentModel.getCurrentTournament(),
      // match: getMatches()[0].dates[0].matches[0],
      subNavigation: 1,
      subSubNavigation: 1,
    });
  },

  // GET /tournament/matches/:id/edit/tickets => Not implement
  getMatchByIdEditTickets: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const matchId = req.params.id;
    res.render('tournament/matches/match-edit-tickets', {
      title: "Chỉnh sửa trận đấu",
      useTransHeader: true,
      user: user,
      tournament: await TournamentModel.getCurrentTournament(),
      subNavigation: 1,
      subSubNavigation: 2,
    });
  },

  // PUT /tournament/modifications/teams/:teamId/accept
  putModificationsTeamsAccept: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    try {
      const team = await TeamModel.getTeam(teamId);
      if (!team.profile) throw new Error('Chưa có hồ sơ đội bóng');
      if (team.status) throw new Error('Đội bóng đã được chấp nhận');
      await TeamModel.updateTeamStatus(teamId, true);
      res.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error' });
    }
  },

  // PUT /tournament/modifications/teams/:teamId/reject
  putModificationsTeamsReject: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const teamId = req.params.teamId;
    try {
      const team = await TeamModel.getTeam(teamId);
      if (!team.profile) throw new Error('Chưa có hồ sơ đội bóng');
      if (!team.status) throw new Error('Đội bóng chưa được chấp nhận sẵn rồi');
      await TeamModel.updateTeamStatus(teamId, false);
      res.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error' });
    }
  },

  // PUT /tournament/modifications/matches
  putModificationsMatches: async function (req, res) {
    const user = req.isAuthenticated() ? req.user : null;
    const matches = req.body.matches;
    try {
      for (const match of matches) {
        await MatchModel.shortUpdateMatch(match.id, match);
      }
      res.json({ status: 'success' });
    } catch (error) {
      console.log(error);
      res.json({ status: 'error' });
    }
  },


}