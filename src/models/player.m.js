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


}

