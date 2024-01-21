require('dotenv').config();
const db = require('./db-config');

module.exports = {

  countRoundsInTournament: (tournamentId) => {
    const query = `
      SELECT COUNT(*) FROM rounds WHERE tournament_id = $1;
    `;
    return db.pool.query(query, [tournamentId]);
  },

  countMatchesInTournament(tournamentId) {
    const query = `
      SELECT COUNT(*) FROM matches WHERE tournament_id = $1;
    `;
    return db.pool.query(query, [tournamentId]);
  },

};