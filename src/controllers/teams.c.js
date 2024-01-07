const user = {
  name: 'Nguyễn Đình Ánh',
  avatar: '/img/avatars/avt-default.png',
};

module.exports = {

  // GET /teams
  getTeams: function (req, res) {
    res.render('teams/teams', {
      title: "Đội bóng",
      useTransHeader: false,
      user: user,
    });
  },

}