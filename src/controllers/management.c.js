
module.exports = {

  // GET /management
  getTeamManagement: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('management/teams', {
      title: "Quản lý đội bóng",
      useTransHeader: true,
      user: user,
      subNavigation: 0,
    });
  },


};