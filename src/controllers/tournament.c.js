const user = {
  name: 'Nguyễn Đình Ánh',
  avatar: '/img/avatars/avt-default.png',
};

module.exports = {

  // GET /tournament
  getTournament: function (req, res) {
    res.render('tournament/tournament', {
      title: "Giải đấu",
      useTransHeader: true,
      user: user,
    });
  },

}