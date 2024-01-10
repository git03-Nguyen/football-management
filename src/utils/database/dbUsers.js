require('dotenv').config();
const db = require('./db-config');

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUND || 10;

module.exports = {

  getUser: async (email, password) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    const result = await db.pool.query(query, [email]);
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
    return await db.pool.query(query, [email, passwordHash]);
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

  getUserByEmail: (email) => {
    const query = `
      SELECT * FROM users WHERE email = $1;
    `;
    return db.pool.query(query, [email], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

  updateUserInfo: (id, email, fullname, birthday, phone, introduction) => {
    const query = `
      UPDATE users SET email = $1, fullname = $2, birthday = $3, phone = $4, introduction = $5 WHERE id = $6;
    `;
    return db.pool.query(query, [email, fullname, birthday, phone, introduction, id], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

  updateUserAvatar: (id, avatar) => {
    const query = `
      UPDATE users SET avatar = $1 WHERE id = $2;
    `;
    return db.pool.query(query, [avatar, id], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

  updateUserPassword: async (id, password) => {
    const query = `
      UPDATE users SET password = $1 WHERE id = $2;
    `;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    return db.pool.query(query, [passwordHash, id], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

  deleteUser: (id) => {
    const query = `
      DELETE FROM users WHERE id = $1;
    `;
    return db.pool.query(query, [id], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

};

