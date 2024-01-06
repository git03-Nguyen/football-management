
module.exports = function (app) {
  app.use('/', require('./general/home.r'));
  app.use('/', require('./general/auth.r'));


  // 404
  app.use(function (req, res, next) {
    res.status(404).render('404', {
      title: "404",
      headerTrans: false,
    });
  });
}