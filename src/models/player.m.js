const dbPlayers = require('../utils/database/dbPlayers');

module.exports = class PlayerModel {

  constructor(player) {
    this.id = player.id;
    this.name = player.name;
    this.number = player.number;
    this.birthyear = player.birthyear;
    this.positions = player.positions;
    this.phone = player.phone;
    this.teamId = player.team_id;
  }

  static async countAllPlayers() {
    return await dbPlayers.countAllPlayers();
  }

  static async getAllPlayersFromTeam(teamId) {
    return await dbPlayers.getAllPlayersFromTeam(teamId);
  }

  static async getPlayer(id) {
    return await dbPlayers.getPlayer(id);
  }

  static async getPlayersInTournament(tournamentId) {
    const res = await dbPlayers.getPlayersInTournament(tournamentId);
    return res.map(player => new PlayerModel(player));
  }

  static async getPlayersStatistics(tournamentId) {
    const statistics = await dbPlayers.getPlayersStatistics(tournamentId);
    return statistics.map(player => {
      const playerObj = new PlayerModel(player);
      playerObj.goals = player.goals;
      playerObj.yellow_cards = player.yellow_cards;
      playerObj.red_cards = player.red_cards;
      playerObj.own_goals = player.own_goals;
      playerObj.doubles = player.doubles;
      playerObj.hattricks = player.hattricks;
      playerObj.pokers = player.pokers;
      return playerObj;
    });
  }

}


