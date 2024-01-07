

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
    res.send('GET /register');
  },

  // POST /register
  postRegister: function (req, res, next) {
    res.send('POST /register');
  },

  // GET /logout
  getLogout: function (req, res, next) {
    res.send('GET /logout');
  },

  // GET /forgot-password
  getForgotPassword: function (req, res, next) {
    res.send('GET /forgot-password');
  },


}