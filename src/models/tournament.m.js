const dbTournaments = require("../utils/database/dbTournaments");
const dbFormats = require("../utils/database/dbFormats");
const TeamModel = require("./team.m");

function convertDate(mDate) {
  if (mDate) {
    const date = new Date(mDate);
    mDate = {};
    mDate.dd = date.getDate();
    if (mDate.dd < 10) {
      mDate.dd = '0' + mDate.dd;
    }
    mDate.mm = date.getMonth() + 1;
    if (mDate.mm < 10) {
      mDate.mm = '0' + mDate.mm;
    }
    mDate.yyyy = date.getFullYear();
  }
  return `${mDate.dd}/${mDate.mm}/${mDate.yyyy}`
}

module.exports = class TournamentModel {

  constructor(tournament) {
    this.id = tournament.id;
    this.name = tournament.name;
    this.timeStart = convertDate(tournament.time_start);
    this.timeEnd = convertDate(tournament.time_end);
    this.place = tournament.place;
    this.mapURL = tournament.map_url;
    this.rulesURL = tournament.rules_url;
    this.nOfFollowers = tournament.n_of_followers;
    this.formatId = tournament.format_id;
    this.format = tournament.format;
    this.maxTeams = tournament.max_teams;
    this.nOfPlayers = tournament.n_of_players;
    this.requireTickets = tournament.require_tickets;
  }

  // count number of tournaments
  static async count() {
    const result = await dbTournaments.count();
    return result.rows[0].count;
  }

  // count number of active tournaments
  static async countActive() {
    const result = await dbTournaments.countActive();
    return result.rows[0].count;
  }

  // Create a new tournament
  static async create(tournament) {
    const result = await dbTournaments.create(tournament);
    return true;
  }

  // Get current tournament
  static async getCurrentTournament() {
    const result = await dbTournaments.getCurrentTournament();
    if (!result.rows) {
      return null;
    }
    const tournament = new TournamentModel(result.rows[0]);
    tournament.format = await dbFormats.getFormatName(tournament.formatId);
    return tournament;
  }

  static async getCurrentTournamentId() {
    const result = await dbTournaments.getCurrentTournamentId();
    if (!result.rows) {
      return null;
    }
    return result.rows[0].id;
  }

  // Count number of active teams in tournament
  static async countActiveTeamsInTournament(id) {
    const count = await dbTournaments.countActiveTeamsInTournament(id);
    return count;
  }

}