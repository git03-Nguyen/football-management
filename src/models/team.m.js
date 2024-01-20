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
    //members, statistics, and schedule are not included in the constructor
  }

  static async countAllTeams() {
    return await dbTeams.countAllTeams();
  }

  static async getAllTeams() {
    const res = await dbTeams.getAllTeams();
    let array = [];
    for (const team of res) {
      let teamObj = new TeamModel(team);
      teamObj.players = {};
      teamObj.players.length = await dbTeams.countPlayers(team.id);
      array.push(teamObj);
    }
    return array;
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

  static async getTeam(id) {
    const res = await dbTeams.getTeam(id);
    if (!res) return null;
    let team = new TeamModel(res);
    team.players = await dbTeams.getPlayers(id);
    return team;
  }

}


