require('dotenv').config();
const db = require('./db-config');

module.exports = {

  countAllPlayers: async () => {
    const query = `
      SELECT COUNT(*) FROM players;
    `;
    const res = await db.pool.query(query);
    return res.rows[0].count;
  },

  getAllPlayersFromTeam: async (teamId) => {
    const query = `
      SELECT * FROM players WHERE team_id = $1;
    `;
    const res = await db.pool.query(query, [teamId]);
    return res.rows;
  },

  getPlayer: async (id) => {
    const query = `
      SELECT * FROM players WHERE id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0];
  },

  getPlayersInTournament: async (tournamentId) => {
    const query = `
      SELECT p.id, p.name, p.number, p.birthyear, p.positions, p.phone, p.team_id, t.name AS team_name
      FROM players p
      JOIN teams t ON t.id = p.team_id
      WHERE t.tournament_id = $1;
    `;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows;
  },

  getPlayersStatistics: async (tournamentId) => {
    const query = `
      SELECT players_statistics.*, teams.name AS team_name
      FROM players_statistics 
      JOIN players ON players.id = players_statistics.player_id
      JOIN teams ON teams.id = players.team_id
      WHERE teams.tournament_id = $1
      ORDER BY players_statistics.goals DESC, players_statistics.yellow_cards DESC, players_statistics.red_cards DESC, players.id ASC;
    `;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows;
  }

};