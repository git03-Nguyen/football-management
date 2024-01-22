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
    const result = await db.pool.query(query, values);
    const id = result.rows[0].id;

    if (tournament.formatId == 1) {
      // insert to matches(tournamet_id, date, time, round)
      // number of matches: tournament.maxTeams * (tournament.maxTeams - 1) / 2
      // date is between tournament.timeStart and tournament.timeEnd
      // time is between 10:00 and 20:00, 3 hours between each match
      // round is from 1 to tournament.maxTeams - 1
      const matches = [];
      const date = new Date(tournament.timeStart);
      const time = new Date(tournament.timeStart);
      time.setHours(10);
      time.setMinutes(0);
      time.setSeconds(0);
      time.setMilliseconds(0);

      for (let i = 0; i < tournament.maxTeams - 1; i++) {
        const round = i + 1;
        for (let j = 0; j < tournament.maxTeams / 2; j++) {
          const timeStr = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
          const dateStr = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
          matches.push({ tournament_id: id, date: dateStr, time: timeStr, round: round });
          time.setHours(time.getHours() + 3);
        }
        date.setDate(date.getDate() + 1);
        time.setHours(10);
      }

      const query = `
        INSERT INTO matches (tournament_id, date, time, round)
        VALUES ($1, $2, $3, $4);
      `;

      for (let i = 0; i < matches.length; i++) {
        const values = [
          matches[i].tournament_id,
          matches[i].date,
          matches[i].time,
          matches[i].round,
        ];
        await db.pool.query(query, values);
      }
    }

    return result;
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

  updateInfo: async (id, tournament) => {
    const query = `
      UPDATE tournaments
      SET name = $1, time_start = $2, time_end = $3, place = $4, map_url = $5, rules_url = $6, format_id = $7, max_teams = $8, n_of_players = $9
      WHERE id = $10
      RETURNING *;
    `;
    const values = [
      tournament.name,
      tournament.timeStart,
      tournament.timeEnd,
      tournament.place,
      tournament.mapURL,
      tournament.rulesURL,
      tournament.formatId,
      tournament.maxTeams,
      tournament.nOfPlayers,
      id,
    ];
    return await db.pool.query(query, values);
  },

};

