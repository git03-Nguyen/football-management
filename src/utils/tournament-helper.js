const TournamentModel = require('../models/tournament.m.js');

module.exports = {

  checkTournament: async function (req, res, next) {
    const countActive = await TournamentModel.countActive();
    if (countActive == 0) {
      return res.redirect('/create');
    }
    next();
  },

}