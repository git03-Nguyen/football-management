require('dotenv').config();
const db = require('./db-config');

module.exports = {

  count: async () => {
    const query = `
      SELECT COUNT(*) FROM tournaments;
    `;
    return await db.pool.query(query);
  },

  countActive: async () => {
    const query = `
      SELECT COUNT(*) FROM tournaments WHERE is_closed = false;
    `;
    return await db.pool.query(query);
  },

  getCurrentTournament: async () => {
    const query = `
      SELECT * FROM tournaments WHERE is_closed = false ORDER BY time_start DESC LIMIT 1;
    `;
    return await db.pool.query(query);
  },

  create: async (tournament) => {
    const query = `
      INSERT INTO tournaments (name, time_start, time_end, place, map_url, rules_url, n_of_followers, format_id, max_teams, n_of_players)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;
    const values = [
      tournament.name,
      tournament.timeStart,
      tournament.timeEnd,
      tournament.place,
      tournament.mapURL,
      tournament.rulesURL,
      tournament.nOfFollowers,
      tournament.formatId,
      tournament.maxTeams,
      tournament.nOfPlayers,
    ];
    return await db.pool.query(query, values);
  },

};
