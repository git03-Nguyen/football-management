module.exports = {

  checkAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  },

  checkNotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/');
    }
    next();
  },

  checkAdmin: function (req, res, next) {
    if (req.isAuthenticated() && req.user.isAdmin) {
      return next();
    }
    res.redirect('/');
  },

  checkOwnTeam: function (req, res, next) {
    if (req.isAuthenticated()) {
      const teamId = req.params.teamId;
      const team = teamDb.getTeams().find(team => team.teamId == teamId);
      if (team && team.ownerId == req.user.id) {
        return next();
      }
    }
    res.redirect('/');
  }

}