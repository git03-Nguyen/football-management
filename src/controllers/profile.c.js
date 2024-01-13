
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

  // POST /profile/edit
  postEditProfile: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.json({
      data: req.body,
    });
  },




};