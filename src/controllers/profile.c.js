
module.exports = {

  // GET /profile
  getProfile: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('profile/profile', {
      title: "Thông tin cá nhân",
      useTransHeader: false,
      user: user,
    });
  },




};