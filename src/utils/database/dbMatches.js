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

  getMatchEvents: async function (id) {
    const query = `
      SELECT players.id, players.name, players.team_id, match_events.type, match_events.time
      FROM match_events LEFT JOIN players ON match_events.player_id = players.id
      WHERE match_events.match_id = $1
      ORDER BY match_events.time, match_events.id
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows;
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
    INSERT INTO match_events (match_id, type, time)
    SELECT
        id AS match_id,
        'start' AS type,
        '00p00s' AS time
    FROM
        matches
    WHERE
        matches.is_played = false AND 
        (matches."date" < CURRENT_DATE OR 
		    (matches."time" <= CURRENT_TIME AND matches."date" = CURRENT_DATE));

    UPDATE matches
    SET is_played = true
    WHERE
        matches.is_played = false AND 
        (matches."date" < CURRENT_DATE OR 
		    (matches."time" <= CURRENT_TIME AND matches."date" = CURRENT_DATE));
    `;
    await db.pool.query(query);
    // update finished after 2 hours
    const query2 = `
    INSERT INTO match_events (match_id, type, time)
    SELECT
        id AS match_id,
        'end' AS type,
        '90p00s' AS time
    FROM
        matches
    WHERE 
        is_finished = false AND
        (matches."date" < CURRENT_DATE OR
        (matches."time" < CURRENT_TIME - INTERVAL '2 hours' AND matches."date" = CURRENT_DATE));

    UPDATE matches
    SET is_finished = true
    WHERE 
        is_finished = false AND
        (matches."date" < CURRENT_DATE OR
        (matches."time" < CURRENT_TIME - INTERVAL '2 hours' AND matches."date" = CURRENT_DATE));
    `;
    await db.pool.query(query2);
  },

};