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
    this.birthday = user.birthday;
    this.phone = user.phone;
    this.introduction = user.introduction;
  }

  // CREATE a new user
  static async createUser(email, password) {
    if (!email || !password) {
      return null;
    }
    // validate email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return null;
    }
    // validate password: at least 6 characters, at least 1 number, at least 1 uppercase letter
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
    // if (!passwordRegex.test(password)) {
    //   return null;
    // }
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



}