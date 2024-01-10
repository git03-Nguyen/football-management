
module.exports = function (app) {
  app.use('/', require('./home.r'));
  app.use('/', require('./auth.r'));

  app.use('/tournament', require('./tournament.r'));
  app.use('/teams', require('./teams.r'));

  app.get('/test', async function (req, res) {
    const dbUsers = require("../utils/database/dbUsers");
    const result = await dbUsers.getAllUsers();
    console.log(result.rows);
    res.send(result.rows);
  });

  // 404
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      title: "404",
      headerTrans: false,
    });
  });
}