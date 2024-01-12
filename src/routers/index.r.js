
module.exports = function (app) {

  // "/", "about"
  app.use('/', require('./home.r'));

  // "/login", "/register", "/logout", "/forgot-password"
  app.use('/', require('./auth.r'));

  // "/profile", "/profile/edit"
  app.use('/profile', require('./profile.r'));

  // "/tournament/", "tournament/teams", "tournament/teams/leaderboard", "tournament/matches", "tournament/statistics", "tournament/statistics/players"
  app.use('/tournament', require('./tournament.r'));

  // "/teams?page=1", "/teams/:teamId"
  app.use('/teams', require('./teams.r'));

  // "/test" for testing
  app.get('/test', async function (req, res) {
    console.log(req.user);
    if (req.user) {
      res.json(req.user);
    } else {
      res.json({
        message: "No user"
      });
    }
  });

  // 404
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      title: "404",
      headerTrans: false,
    });
  });

}