

module.exports = {
  getHome: function (req, res) {
    res.render('home', {
      title: "Code of Duty",
      headerTrans: true,
      styleP: () => { return "styles/home" }
    });
  },

  getAbout: function (req, res) {
    res.render('about');
  },
}