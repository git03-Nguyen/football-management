const dbProvider = require("./utils/db");

module.exports = class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  save() {
    const db = dbProvider.getDB();
    return db.collection("users").insertOne(this);
  }

  static findByEmail(email) {
    const db = dbProvider.getDB();
    return db.collection("users").findOne({ email: email });
  }
}