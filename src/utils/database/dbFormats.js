require('dotenv').config();
const db = require('./db-config');

module.exports = {
  getFormatName: async (formatId) => {
    const query = `
      SELECT type FROM formats WHERE id = $1;
    `;
    const res = await db.pool.query(query, [formatId]);
    return res.rows[0].type;
  },

};