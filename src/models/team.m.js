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
    return await dbTeams.getAllTeams();
  }

}


