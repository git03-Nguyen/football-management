const dbTournaments = require("../utils/database/dbTournaments");

module.exports = class TournamentModel {

  constructor(tournament) {
    this.id = tournament.id;
    this.name = tournament.name;
    this.timeStart = tournament.time_start;
    this.timeEnd = tournament.time_end;
    this.place = tournament.place;
    this.mapURL = tournament.map_url;
    this.rulesURL = tournament.rules_url;
    this.nOfFollowers = tournament.n_of_followers;
    this.formatId = tournament.format_id;
    this.maxTeams = tournament.max_teams;
    this.nOfPlayers = tournament.n_of_players;
    this.requireTickets = tournament.require_tickets;
  }

  // count number of tournaments
  static async count() {
    const result = await dbTournaments.count();
    return result.rows[0].count;
  }

  // Create a new tournament
  static async create(tournament) {
    const result = await dbTournaments.create(tournament);
    return new TournamentModel(result[0]);
  }

  // Get current tournament
  static async getCurrentTournament() {
    const result = await dbTournaments.getCurrentTournament();
    if (!result.rows) {
      return null;
    }
    return new TournamentModel(result.rows[0]);
  }


}