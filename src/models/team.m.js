const dbTeams = require('../utils/database/dbTeams');

module.exports = class TeamModel {

  constructor(team) {
    this.id = team.id;
    this.name = team.name;
    this.tournamentId = team.tournament_id;
    this.ownerId = team.owner_id;
    this.contactName = team.contact_name;
    this.contactEmail = team.contact_email;
    this.contactPhone = team.contact_phone;
    this.level = team.level;
    this.introduction = team.introduction;
    this.hasUniform = team.has_uniform;
    this.profile = team.profile;
    this.status = team.status;
    //members, statistics, and schedule are not included in the constructor
  }

  static async countAllTeams() {
    return await dbTeams.countAllTeams();
  }

  static async countTeamsInTournament(id) {
    return await dbTeams.countTeamsInTournament(id);
  }

  static async createTeam(team) {
    return await dbTeams.createTeam(team);
  }

  static async getAllCurrentTeams() {
    const res = await dbTeams.getAllCurrentTeams();
    let array = [];
    for (const team of res) {
      let teamObj = new TeamModel(team);
      teamObj.players = {};
      teamObj.players.length = await dbTeams.countPlayers(team.id);
      array.push(teamObj);
    }
    return array;
  }

  static async getAllActiveTeams() {
    const res = await dbTeams.getAllActiveTeams();
    let array = [];
    for (const team of res) {
      let teamObj = new TeamModel(team);
      teamObj.players = {};
      teamObj.players.length = await dbTeams.countPlayers(team.id);
      array.push(teamObj);
    }
    return array;
  }

  static async getTeam(id) {
    const res = await dbTeams.getTeam(id);
    if (!res) return null;
    let team = new TeamModel(res);
    team.players = await dbTeams.getPlayers(id);
    return team;
  }

  static async getTeamsByOwner(ownerId) {
    const res = await dbTeams.getTeamsByOwner(ownerId);
    if (!res) return null;
    let teams = [];
    for (const team of res) {
      let teamObj = new TeamModel(team);
      teamObj.players = await dbTeams.getPlayers(team.id);
      teams.push(teamObj);
    }
    return teams;
  }

  static async updateTeam(id, team) {
    return await dbTeams.updateTeam(id, team);
  }

  static async removePlayer(teamId, playerId) {
    return await dbTeams.removePlayer(teamId, playerId);
  }

  static async updateTeamStatus(id, status) {
    return await dbTeams.updateTeamStatus(id, status);
  }

  static async getTeamsStatistics() {
    return await dbTeams.getTeamsStatistics();
  }

  static async getTeamsLeaderboard() {
    const teams = await TeamModel.getAllActiveTeams();
    const teamStatistics = await TeamModel.getTeamsStatistics();
    teams.forEach(team => {
      const statistics = teamStatistics.find(stat => stat.team_id === team.id);
      if (statistics) {
        team.nOfPlayedMatches = statistics.played;
        team.nOfWins = statistics.wins;
        team.nOfDraws = statistics.draws;
        team.nOfLosses = statistics.losses;
        team.nOfGoals = statistics.goals;
        team.nOfOwnGoals = statistics.own_goals;
        team.nOfGoalsAgainst = statistics.a_goals;
        team.goalDifference = statistics.goals - statistics.a_goals;
        team.nOfRedCards = statistics.red_cards;
        team.nOfYellowCards = statistics.yellow_cards;
        team.score = statistics.score;
      }
    });
    teams.sort((a, b) => {
      if (a.score > b.score) return -1;
      if (a.score < b.score) return 1;
      if (a.goalDifference > b.goalDifference) return -1;
      if (a.goalDifference < b.goalDifference) return 1;
      if (a.nOfGoals > b.nOfGoals) return -1;
      if (a.nOfGoals < b.nOfGoals) return 1;
      if (a.nOfGoalsAgainst < b.nOfGoalsAgainst) return -1;
      if (a.nOfGoalsAgainst > b.nOfGoalsAgainst) return 1;
      return 0;
    });
    return teams;
  }

}


