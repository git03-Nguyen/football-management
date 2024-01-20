require('dotenv').config();
const db = require('./db-config');
const TournamentModel = require('../../models/tournament.m');

module.exports = {

  countAllTeams: async () => {
    const query = `
      SELECT COUNT(*) FROM teams;
    `;
    const res = await db.pool.query(query);
    return res.rows[0].count;
  },

  countTeamsInTournament: async (id) => {
    const query = `
      SELECT COUNT(*) FROM teams WHERE tournament_id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0].count;
  },

  getAllTeams: async () => {
    const query = `
      SELECT * FROM teams;
    `;
    const res = await db.pool.query(query);
    return res.rows;
  },

  getAllCurrentTeams: async () => {
    const currentTournamentId = await TournamentModel.getCurrentTournamentId();
    const query = `
      SELECT * FROM teams WHERE tournament_id = $1 ORDER BY id ASC;
    `;
    const res = await db.pool.query(query, [currentTournamentId]);
    return res.rows;
  },

  getTeam: async (id) => {
    const query = `
      SELECT * FROM teams WHERE id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0];
  },

  countPlayers: async (id) => {
    const query = `
      SELECT COUNT(*) FROM players WHERE team_id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0].count;
  },

  getPlayers: async (id) => {
    const query = `
      SELECT * FROM players WHERE team_id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows;
  },

};