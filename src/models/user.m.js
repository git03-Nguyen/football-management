const dbUsers = require("../utils/database/dbUsers");

module.exports = class UserModel {

  // constructor(id, email, fullname, avatar, birthday, phone, introduction) {
  //   this.id = id;
  //   this.email = email;
  //   this.fullname = fullname;
  //   this.avatar = avatar;
  //   this.birthday = birthday;
  //   this.phone = phone;
  //   this.introduction = introduction;
  // }

  constructor(user) {
    this.id = user.id;
    this.email = user.email;
    this.fullname = user.fullname;
    this.avatar = user.avatar;
    if (user.birthday) {
      const date = new Date(user.birthday);
      this.birthday = {};
      this.birthday.dd = date.getDate();
      if (this.birthday.dd < 10) {
        this.birthday.dd = '0' + this.birthday.dd;
      }
      this.birthday.mm = date.getMonth() + 1;
      if (this.birthday.mm < 10) {
        this.birthday.mm = '0' + this.birthday.mm;
      }
      this.birthday.yyyy = date.getFullYear();
    }
    this.phone = user.phone;
    this.introduction = user.introduction;
    this.isAdmin = user.privilege === 1;
  }

  // CREATE a new user
  static async createUser(email, password) {
    if (!email || !password) {
      return null;
    }
    const result = await dbUsers.createUser(email, password);
    if (!result) {
      return null;
    }
    return new UserModel(result.rows[0]);
  }

  // DELETE a user
  static async deleteUser(id) {
    if (!id) {
      return null;
    }
    const result = dbUsers.deleteUser(id);
    return result;
  }

  // READ a user
  static async getUserById(id) {
    if (!id) {
      return null;
    }
    const result = await dbUsers.getUserById(id);
    if (!result) {
      return null;
    }
    return new UserModel(result.rows[0]);
  }

  // READ a user
  static async getUserByEmail(email) {
    if (!email) {
      return null;
    }
    const result = await dbUsers.getUserByEmail(email);
    if (!result) {
      return null;
    }
    return new UserModel(result.rows[0]);
  }

  // READ all users
  static async getAllUsers() {
    const result = await dbUsers.getAllUsers();
    // return an array of User objects
    const users = [];
    result.rows.forEach(row => {
      users.push(new UserModel(row));
    });
    return users;
  }

  // READ / AUTHENTICATE a user
  static async getUser(email, password) {
    if (!email || !password) {
      return null;
    }
    const result = await dbUsers.getUser(email, password);
    if (!result) {
      return null;
    }
    return new UserModel(result.rows[0]);
  }

  // UPDATE a user
  static async updateUser(id, fullname, birthday, phone, introduction, avatar) {
    if (!id) {
      return null;
    }
    let result = await dbUsers.updateUserInfo(id, fullname, birthday, phone, introduction);
    if (!result) {
      return null;
    }
    await dbUsers.updateUserAvatar(id, avatar);
    return true;
  }

  // UPDATE a user's password
  static async changePassword(id, password, newPassword) {
    if (!id) {
      return null;
    }

    const result = await dbUsers.updateUserPassword(id, newPassword);
    if (!result) {
      return null;
    }
    return true;
  }



}