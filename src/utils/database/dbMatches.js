require('dotenv').config();
const db = require('./db-config');

module.exports = {

  countRoundsInTournament: async function (tournamentId) {
    const query = `SELECT MAX(round) FROM matches WHERE tournament_id = $1`;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows[0].max;
  },

  getMatchesInTournament: async function (tournamentId) {
    const query = `SELECT * FROM matches WHERE tournament_id = $1 ORDER BY round, date, id`;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows;
  },

  getMatch: async function (id) {
    const query = `SELECT * FROM matches WHERE id = $1`;
    const res = await db.pool.query(query, [id]);
    return res.rows[0];
  },

  shortUpdateMatch: async function (id, match) {
    const query = `
      UPDATE matches
      SET team_id_1 = $1, team_id_2 = $2, place = $3, date = $4, time = $5
      WHERE id = $6
    `;
    const res = await db.pool.query(query, [match.teamId1, match.teamId2, match.place, match.date, match.time, id]);
    return res.rows[0];
  },

  getNumberOfOwnGoalsInTournament: async function (tournamentId) {
    const query = `
    SELECT SUM(own_goals) FROM (
      SELECT * FROM teams_statistics JOIN teams ON teams_statistics.team_id = teams.id
      WHERE teams.tournament_id = $1
    )
    `;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows[0].sum;
  },

  getNumberOfCardsInTournament: async function (tournamentId) {
    const query = `
    SELECT SUM(red_cards) AS sum1, SUM(yellow_cards) AS sum2 FROM (
      SELECT * FROM teams_statistics JOIN teams ON teams_statistics.team_id = teams.id
      WHERE teams.tournament_id = $1
    )
    `;
    const res = await db.pool.query(query, [tournamentId]);
    return (+res.rows[0].sum1) + (+res.rows[0].sum2);
  },

  updateMatchesPlayedOrFinished: async function () {
    const query = `
    UPDATE public.matches
    SET 
      is_played = true,
      logs = logs || ARRAY['Trận đấu bắt đầu!'],
      log_times = log_times || ARRAY['00p00s']
    WHERE 
      (date <= CURRENT_DATE AND "time" <= CURRENT_TIME) AND is_played = false;
    `;
    await db.pool.query(query);
    // update finished after 2 hours
    const query2 = `
    UPDATE matches
    SET 
      is_finished = true,
      logs = logs || ARRAY['Trận đấu kết thúc!'],
      log_times = log_times || ARRAY['90p00s'],
      winner_id = CASE WHEN scores_1 > scores_2 THEN team_id_1 WHEN scores_1 < scores_2 THEN team_id_2 ELSE 0 END
    WHERE 
      (date < CURRENT_DATE) OR ((date = CURRENT_DATE) AND ("time" < CURRENT_TIME - INTERVAL '2 hours')) AND is_finished = false;
    `;
    await db.pool.query(query2);
  },

};