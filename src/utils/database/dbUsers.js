require('dotenv').config();
const db = require('./db-config');

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUND || 10;

module.exports = {

  getUser: async (email, password) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const result = await db.pool.query(query, [email.toLowerCase()]);
    if (!result.rows[0]) {
      return null;
    }
    const match = await bcrypt.compare(password, result.rows[0].password);
    if (!match) {
      return null;
    }
    // return the result of the query
    return result;
  },

  createUser: async (email, password) => {
    const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id;
  `;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    return await db.pool.query(query, [email.toLowerCase(), passwordHash]);
  },

  getAllUsers: async () => {
    const query = `
      SELECT * FROM users;
    `;
    return await db.pool.query(query);
  },

  getUserById: async (id) => {
    const query = `
      SELECT * FROM users WHERE id = $1;
    `;
    return await db.pool.query(query, [id]);
  },

  getUserByEmail: async (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    return await db.pool.query(query, [email.toLowerCase()]);
  },

  updateUserInfo: async (id, fullname, birthday, phone, introduction) => {
    if (birthday.length == 0) { birthday = null; }
    if (phone.length == 0) { phone = null; }
    if (introduction.length == 0) { introduction = null; }
    const query = `
      UPDATE users SET fullname = $1, birthday = $2, phone = $3, introduction = $4 WHERE id = $5;
    `;
    return await db.pool.query(query, [fullname, birthday, phone, introduction, id]);
  },

  updateUserAvatar: async (id, avatar) => {
    const query = `
        UPDATE users SET avatar = $1 WHERE id = $2;
      `;
    console.log(avatar);

    return await db.pool.query(query, [avatar, id]);
  },

  updateUserPassword: async (id, newPassword) => {
    const query = `
      UPDATE users SET password = $1 WHERE id = $2;
    `;
    const passwordHash = await bcrypt.hash(newPassword, saltRounds);
    return await db.pool.query(query, [passwordHash, id]);
  },


};

