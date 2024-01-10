const UserModel = require('../models/user.m');
const passport = require('passport');

module.exports = {

  // GET /login
  getLogin: function (req, res, next) {
    res.render('login', {
      title: "Đăng nhập",
      useShortFooter: true,
    });
  },

  // POST /login
  postLogin: passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }),

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
  getLogout: function (req, res) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/login');
    });
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