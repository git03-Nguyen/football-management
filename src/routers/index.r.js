
module.exports = function (app) {
  app.use('/', require('./home.r'));
  app.use('/', require('./auth.r'));

  app.use('/tournament', require('./tournament.r'));


  // 404
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      title: "404",
      headerTrans: false,
    });
  });
}