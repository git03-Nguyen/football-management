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

  getCurrentTournamentId: async () => {
    const query = `
      SELECT id FROM tournaments WHERE is_closed = false ORDER BY time_start DESC LIMIT 1;
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

  countActiveTeamsInTournament: async (id) => {
    const query = `
      SELECT COUNT(*) FROM teams WHERE tournament_id = $1 AND status = true;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0].count;
  },

  getActiveTeamsInTournament: async (id) => {
    const query = `
      SELECT * FROM teams WHERE tournament_id = $1 AND status = true;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows;
  },

  countPlayersInTournament: async (id) => {
    const query = `
      SELECT COALESCE(SUM(count), 0) AS total_count
      FROM teams t
      LEFT JOIN (
          SELECT team_id, COUNT(*) AS count
          FROM public.players
          WHERE team_id IN (
              SELECT id 
              FROM teams
              WHERE status = true AND tournament_id = $1
          )
          GROUP BY team_id
      ) p ON t.id = p.team_id
      WHERE t.status = true AND t.tournament_id = (
          SELECT id FROM tournaments WHERE is_closed = false
      );
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0].total_count;
  },

};

