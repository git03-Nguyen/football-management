const UserModel = require('../models/user.m');

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
  postEditProfile: async function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    const { fullname, birthday, phone, introduction } = JSON.parse(req.body.data);
    const avatar = req.file ? req.file.filename : user.avatar;

    if (fullname.length == 0) {
      return res.status(400).send({ status: 'error', message: "Họ tên không được để trống" });
    }
    if (birthday.length && !Date.parse(birthday)) {
      return res.status(400).send({ status: 'error', message: "Ngày sinh không hợp lệ!" });
    }
    if (phone.length && !phone.match(/^\d{10}$/)) {
      return res.status(400).send({ status: 'error', message: "Số điện thoại không hợp lệ!" });
    }
    if (introduction.length > 300) {
      return res.status(400).send({ status: 'error', message: "Giới thiệu không được quá 300 ký tự!" });
    }

    try {
      await UserModel.updateUser(user.id, fullname, birthday, phone, introduction, avatar);
      return res.status(200).send({ status: 'success', message: "Cập nhật thông tin thành công!" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', message: "Cập nhật thông tin thất bại!" });
    }

  },

  // GET /profile/change-password
  getChangePassword: function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    res.render('profile/change-password', {
      title: "Đổi mật khẩu",
      useTransHeader: false,
      user: user,
    });
  },

  // POST /profile/change-password
  postChangePassword: async function (req, res) {
    const user = (req.isAuthenticated() ? req.user : null);
    const { password, newPassword } = req.body;
    if (newPassword.length < 6) {
      return res.status(400).send({ status: 'error', message: "Mật khẩu mới phải có ít nhất 6 ký tự!" });
    }
    if (newPassword === password) {
      return res.status(400).send({ status: 'error', message: "Mật khẩu mới không được trùng mật khẩu cũ!" });
    }

    // check password is coorect
    const result = await UserModel.getUserById(user.id);
    if (!result) {
      return res.status(400).send({ status: 'error', message: "Đổi mật khẩu thất bại!" });
    }
    const match = await UserModel.getUser(user.email, password);
    if (!match) {
      return res.status(400).send({ status: 'error', message: "Mật khẩu cũ không đúng!" });
    }

    try {
      await UserModel.changePassword(user.id, password, newPassword);
      return res.status(200).send({ status: 'success', message: "Đổi mật khẩu thành công!" });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ status: 'error', message: "Đổi mật khẩu thất bại!" });
    }
  },



};