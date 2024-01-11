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
  }

}