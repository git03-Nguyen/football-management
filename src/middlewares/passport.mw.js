require('dotenv').config();
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/user.m");

module.exports = (app) => {

  const sessionSecret = process.env.SESSION_SECRET || "CodeOfDutySecret";
  const oneHour = 3600000;
  app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: oneHour,
      httpOnly: true,
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    const user = await UserModel.getUser(email, password);
    if (!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }
    return done(null, user);
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.getUserById(id);
    const avatarPath = "/img/avatars/";
    user.avatar = avatarPath + user.avatar;

    done(null, user);
  });

}
