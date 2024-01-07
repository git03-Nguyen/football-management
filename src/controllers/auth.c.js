

module.exports = {

  // GET /login
  getLogin: function (req, res, next) {
    res.render('login', {
      title: "Đăng nhập",
      useShortFooter: true,
    });
  },

  // POST /login
  postLogin: function (req, res, next) {
    res.redirect('/');
  },

  // GET /register
  getRegister: function (req, res, next) {
    res.render('register', {
      title: "Đăng ký",
      useShortFooter: true,
    });
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
    res.render('forgot-password', {
      title: "Quên mật khẩu",
      useShortFooter: true,
    });
  },

  // POST /forgot-password
  postForgotPassword: function (req, res, next) {
    res.send('POST /forgot-password');
  },


}