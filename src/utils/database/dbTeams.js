require('dotenv').config();
const db = require('./db-config');

module.exports = {
  countAllTeams: async () => {
    const query = `
      SELECT COUNT(*) FROM teams;
    `;
    const res = await db.pool.query(query);
    return res.rows[0].count;
  },

};