require('dotenv').config();
const db = require('./db-config');

module.exports = {

  countRoundsInTournament: async function (tournamentId) {
    const query = `SELECT MAX(round) FROM matches WHERE tournament_id = $1`;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows[0].max;
  },

  getMatchesInTournament: async function (tournamentId) {
    const query = `SELECT * FROM matches WHERE tournament_id = $1 ORDER BY round`;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows;
  },

};