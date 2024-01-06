

module.exports = {

  // GET /login
  getLogin: function (req, res, next) {
    res.render('login', {
      title: "Login",
      useShortFooter: true,
    });
  },

  // POST /login
  postLogin: function (req, res, next) {
    res.redirect('/');
  },

  // GET /register
  getRegister: function (req, res, next) {

  },

  // POST /register
  postRegister: function (req, res, next) {

  },

  // GET /logout
  getLogout: function (req, res, next) {

  },


}