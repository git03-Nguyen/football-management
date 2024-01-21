require('dotenv').config();
const db = require('./db-config');

module.exports = {

  countAllPlayers: async () => {
    const query = `
      SELECT COUNT(*) FROM players;
    `;
    const res = await db.pool.query(query);
    return res.rows[0].count;
  },

  getAllPlayersFromTeam: async (teamId) => {
    const query = `
      SELECT * FROM players WHERE team_id = $1;
    `;
    const res = await db.pool.query(query, [teamId]);
    return res.rows;
  },

  getPlayer: async (id) => {
    const query = `
      SELECT * FROM players WHERE id = $1;
    `;
    const res = await db.pool.query(query, [id]);
    return res.rows[0];
  },

  getPlayersInTournament: async (tournamentId) => {
    const query = `
      SELECT p.id, p.name, p.number, p.birthyear, p.positions, p.phone, p.team_id, t.name AS team_name
      FROM players p
      JOIN teams t ON t.id = p.team_id
      WHERE t.tournament_id = $1;
    `;
    const res = await db.pool.query(query, [tournamentId]);
    return res.rows;
  },

  getPlayersStatistics: async (tournamentId) => {
    const query1 = `
    SELECT
        players.*,
        COUNT(CASE WHEN match_events.type = 'goal' THEN 1 END) AS goals,
        COUNT(CASE WHEN match_events.type = 'yellow_card' THEN 1 END) AS yellow_cards,
        COUNT(CASE WHEN match_events.type = 'red_card' THEN 1 END) AS red_cards,
        COUNT(CASE WHEN match_events.type = 'own_goal' THEN 1 END) AS own_goals
    FROM
        players
    LEFT JOIN
        match_events ON players.id = match_events.player_id
    LEFT JOIN
        teams ON players.team_id = teams.id
    WHERE
        teams.tournament_id = $1
    GROUP BY
        players.id
    ORDER BY
        goals DESC, yellow_cards ASC, red_cards ASC, own_goals ASC, players.id ASC;
    `;
    const res1 = (await db.pool.query(query1, [tournamentId])).rows;
    const query2 = `
    WITH GoalCounts AS (
      SELECT
          player_id,
          COUNT(*) AS goals_in_a_match
      FROM
          match_events
      WHERE
          type = 'goal'
      GROUP BY
          player_id, match_id
    )
    
    SELECT
        players.id,
        COUNT(CASE WHEN goals_in_a_match = 2 THEN 1 END) AS doubles,
        COUNT(CASE WHEN goals_in_a_match = 3 THEN 1 END) AS hattricks,
        COUNT(CASE WHEN goals_in_a_match >= 4 THEN 1 END) AS pokers
    FROM
        players
    LEFT JOIN
        GoalCounts ON players.id = GoalCounts.player_id
    LEFT JOIN
        teams ON players.team_id = teams.id
    WHERE
        teams.tournament_id = $1
    GROUP BY
        players.id 
    ORDER BY
        pokers DESC, hattricks DESC, doubles DESC, players.id;
    `;
    const res2 = (await db.pool.query(query2, [tournamentId])).rows;
    return res1.map(player => {
      const playerObj = player;
      const player2 = res2.find(p => p.id === player.id);
      playerObj.doubles = player2.doubles;
      playerObj.hattricks = player2.hattricks;
      playerObj.pokers = player2.pokers;
      return playerObj;
    });
  }

};