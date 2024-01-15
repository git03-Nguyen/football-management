require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'postgres',
});
// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL + "?sslmode=require",
// });

pool.connect((err) => {
  if (err) throw err
  console.log("Connect to PostgreSQL successfully!")
});

module.exports = {
  pool
}