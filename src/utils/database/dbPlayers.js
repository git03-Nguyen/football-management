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

};