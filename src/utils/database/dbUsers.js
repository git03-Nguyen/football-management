require('dotenv').config();
const db = require('./db-config');

const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUND || 10;

module.exports = {

  getUser: async (email, password) => {
    const user = this.getUserByEmail(email);
    if (!user) {
      return null;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return null;
    }
    return user;
  },

  createUser: async (email, password) => {
    const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id;
  `;

    const passwordHash = await bcrypt.hash(password, saltRounds);
    return db.pool.query(query, [email, passwordHash], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
  },

  getAllUsers: () => {
    const query = `
      SELECT * FROM users;
    `;
    return db.pool.query(query, (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows);
      }
    });
  },

  getUserById: (id) => {
    const query = `
      SELECT * FROM users WHERE id = $1;
    `;
    return db.pool.query(query, [id], (err, res) => {
      if (err) {
        throw err;
      } else {
        console.log(res.rows[0]);
      }
    });
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

  updateUserInfo: (id, email, name, birthday, phone, introduction) => {
    const query = `
      UPDATE users SET email = $1, name = $2, birthday = $3, phone = $4, introduction = $5 WHERE id = $6;
    `;
    return db.pool.query(query, [email, name, birthday, phone, introduction, id], (err, res) => {
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

