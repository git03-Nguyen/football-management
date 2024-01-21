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

  getAllActiveTeams: async () => {
    const currentTournamentId = await TournamentModel.getCurrentTournamentId();
    const query = `
      SELECT * FROM teams WHERE tournament_id = $1 AND status = true ORDER BY id ASC;
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
      SELECT * FROM players WHERE team_id = $1 ORDER BY id ASC;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows;
  },

  getTeamsByOwner: async (ownerId) => {
    const query = `
      SELECT * FROM teams WHERE owner_id = $1 ORDER BY id ASC;
    `;
    const res = await db.pool.query(query, [ownerId]);
    return res.rows;
  },

  updateTeam: async (id, team) => {
    console.log(team);
    const query = `
      UPDATE teams SET name = $1, contact_name = $2, contact_email = $3, contact_phone = $4, level = $5, introduction = $6, has_uniform = $7, profile = $8 WHERE id = $9;
    `;
    const res = await db.pool.query(query, [team.name, team.contactName, team.contactEmail, team.contactPhone, team.level, team.introduction, false, team.profile, id]);
    return res.rowCount;
  },

  removePlayer: async (teamId, playerId) => {
    const query = `
      UPDATE players SET team_id = NULL WHERE id = $1;
    `;
    const res = await db.pool.query(query, [playerId]);
    return res.rowCount;
  },

  updateTeamStatus: async (id, status) => {
    if (status) {
      const currentTournament = await TournamentModel.getCurrentTournament();
      // count (status = true) teams in current tournament
      const query = `
        SELECT COUNT(*) FROM teams WHERE tournament_id = $1 AND status = true;
      `;
      const res = await db.pool.query(query, [currentTournament.id]);
      const count = res.rows[0].count;
      if (count >= currentTournament.maxTeams) {
        return 0;
      }
    }
    const query = `
      UPDATE teams SET status = $1 WHERE id = $2;
    `;
    const res = await db.pool.query(query, [status, id]);
    return res.rowCount;
  },

  getTeamsStatistics: async () => {
    const query = `
      SELECT * FROM teams_statistics ORDER BY score ASC, team_id ASC;
    `;
    const res = await db.pool.query(query);
    return res.rows;
  }

};