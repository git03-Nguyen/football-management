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
    this.time = match.time;
    this.round = match.round;
    this.place = match.place;
    this.requireTickets = false;
    this.views = match.views;
  }


};