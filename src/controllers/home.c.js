const user = {
  name: 'Nguyễn Đình Ánh',
  avatar: '/img/avatars/avt-default.png',
};

module.exports = {

  // GET /
  getHome: function (req, res) {
    res.render('home', {
      title: "Trang chủ",
      useTransHeader: true,
      nTournaments: 1,
      nTeams: 30,
      nPlayers: 180,
      user: user,
    });
  },

  // GET /about
  getAbout: function (req, res) {
    res.render('about', {
      title: "Giới thiệu",
      useTransHeader: false,
      user: user,
    });
  },

}