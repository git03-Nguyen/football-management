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

  // POST /login: login and send json response
  postLogin: function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) { return next(err); }
      if (!user) {
        return res.status(400).send({ status: 'error', message: 'Email hoặc mật khẩu không chính xác' });
      }
      req.logIn(user, function (err) {
        if (err) { return next(err); }
        if (req.body.remember) {
          const oneDay = 1000 * 60 * 60 * 24;
          req.session.cookie.expires = new Date(Date.now() + oneDay);
          req.session.cookie.maxAge = oneDay;
        } else {
          req.session.cookie.expires = false;
        }
        return res.status(200).send({ status: 'success', message: 'Đăng nhập thành công' });
      });
    })(req, res, next);
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
    if (!email || !password || !retype) {
      return res.status(400).send({ status: 'error', message: 'Vui lòng nhập đầy đủ thông tin' });
    }
    if (password !== retype) {
      return res.status(400).send({ status: 'error', message: 'Mật khẩu không khớp' });
    }
    let user;
    try {
      user = await UserModel.createUser(email, password);
      if (!user) {
        return res.status(400).send({ status: 'error', message: 'Đăng ký thất bại' });
      }
      res.status(200).send({ status: 'success', message: 'Đăng ký thành công' });
    } catch (err) {
      return res.status(500).send({ status: 'error', message: 'Email đã được đăng ký' });
    }
  },

  // GET /logout
  getLogout: function (req, res, next) {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('back');
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