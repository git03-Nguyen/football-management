const UserModel = require('../models/user.m');

module.exports = {

  // GET /login
  getLogin: function (req, res, next) {
    res.render('login', {
      title: "Đăng nhập",
      useShortFooter: true,
    });
  },

  // POST /login
  postLogin: async function (req, res, next) {
    const { email, password, remember } = req.body;
    const user = await UserModel.getUser(email, password);

    if (!user) {
      return res.send('Email hoặc mật khẩu không đúng');
    }

    res.send('Đăng nhập thành công' + JSON.stringify(user));
  },

  // GET /register
  getRegister: function (req, res, next) {
    res.render('register', {
      title: "Đăng ký",
      useShortFooter: true,
    });
  },

  // POST /register
  postRegister: async function (req, res, next) {
    const { email, password, retype } = req.body;
    if (password !== retype) {
      return res.send('Mật khẩu không khớp');
    }
    const user = await UserModel.createUser(email, password);
    if (!user) {
      return res.send('Email đã được đăng ký');
    }
    res.send('Đăng ký thành công' + JSON.stringify(user));
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