const dbMatches = require('../utils/database/dbMatches');

function convertDate(mDate) {
  if (mDate) {
    const date = new Date(mDate);
    mDate = {};
    mDate.dd = date.getDate();
    if (mDate.dd < 10) {
      mDate.dd = '0' + mDate.dd;
    }
    mDate.mm = date.getMonth() + 1;
    if (mDate.mm < 10) {
      mDate.mm = '0' + mDate.mm;
    }
    mDate.yyyy = date.getFullYear();
  }
  return `${mDate.yyyy}-${mDate.mm}-${mDate.dd}`
}

function convertTime(mTime) {
  if (mTime) {
    mTime = mTime.slice(0, 5);
  }
  return mTime;
}

module.exports = class Match {

  constructor(match) {
    this.id = match.id;
    this.tournamentId = match.tournament_id;
    this.teamId1 = match.team_id_1;
    this.teamId2 = match.team_id_2;
    this.scores1 = match.scores_1;
    this.scores2 = match.scores_2;
    this.winnerId = match.winner_id;
    this.date = convertDate(match.date);
    this.time = convertTime(match.time);
    this.round = match.round;
    this.place = match.place;
    this.requireTickets = false;
    this.views = match.views;
    this.isPlayed = match.is_played;
    this.isFinished = match.is_finished;
    this.events = match.events;

  }

  static async getRoundsInTournament(tournamentId) {
    const matches = await dbMatches.getMatchesInTournament(tournamentId);
    const nOfRounds = await dbMatches.countRoundsInTournament(tournamentId);
    const rounds = [];
    for (let i = 0; i < nOfRounds; i++) {
      rounds.push([]);
    }
    matches.forEach(match => {
      const matchObj = new Match(match);
      rounds[matchObj.round - 1].push(matchObj);
    });
    return rounds;
  }

  static async getMatchesInTournament(tournamentId) {
    const matches = await dbMatches.getMatchesInTournament(tournamentId);
    return matches.map(match => new Match(match));
  }

  static async getMatch(id) {
    const match = await dbMatches.getMatch(id);
    let matchObj = new Match(match);
    matchObj.events = await dbMatches.getMatchEvents(id);
    // each event is an object with properties: name, team_id, type, time
    matchObj.yellowCards1 = matchObj.events.filter(event => event.type === 'yellow_card' && event.team_id === matchObj.teamId1);
    matchObj.yellowCards2 = matchObj.events.filter(event => event.type === 'yellow_card' && event.team_id === matchObj.teamId2);
    matchObj.redCards1 = matchObj.events.filter(event => event.type === 'red_card' && event.team_id === matchObj.teamId1);
    matchObj.redCards2 = matchObj.events.filter(event => event.type === 'red_card' && event.team_id === matchObj.teamId2);
    matchObj.ownGoals1 = matchObj.events.filter(event => event.type === 'own_goal' && event.team_id === matchObj.teamId1);
    matchObj.ownGoals2 = matchObj.events.filter(event => event.type === 'own_goal' && event.team_id === matchObj.teamId2);
    matchObj.goals1 = matchObj.events.filter(event => event.type === 'goal' && event.team_id === matchObj.teamId1);
    matchObj.goals2 = matchObj.events.filter(event => event.type === 'goal' && event.team_id === matchObj.teamId2);
    return matchObj;
  }

  static async shortUpdateMatch(id, match) {
    return await dbMatches.shortUpdateMatch(id, match);
  }

  static async getNumberOfGoalsInTournament(tournamentId) {
    const matches = await dbMatches.getMatchesInTournament(tournamentId);
    let goals = 0;
    matches.forEach(match => {
      goals += match.scores_1 + match.scores_2;
    });
    return goals;
  }

  static async getNumberOfOwnGoalsInTournament(tournamentId) {
    return await dbMatches.getNumberOfOwnGoalsInTournament(tournamentId);
  }

  static async getNumberOfCardsInTournament(tournamentId) {
    return await dbMatches.getNumberOfCardsInTournament(tournamentId);
  }

  static async addNewGoal(goal) {
    return await dbMatches.addNewGoal(goal);
  }

  static async addNewCard(card) {
    return await dbMatches.addNewCard(card);
  }



  // static async getMostGoalsMatchInTournament(tournamentId) {
  //   const matches = await dbMatches.getMatchesInTournament(tournamentId);
  //   let maxGoals = 0;
  //   let maxMatch = null;
  //   matches.forEach(match => {
  //     if (match.scores_1 + match.scores_2 > maxGoals) {
  //       maxGoals = match.scores_1 + match.scores_2;
  //       maxMatch = match;
  //     }
  //   });
  //   return maxMatch;
  // }

};