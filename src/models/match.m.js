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
    return new Match(match);
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