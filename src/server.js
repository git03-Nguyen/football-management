require('dotenv').config();
const express = require('express');
const app = express();

const hbsMiddleware = require('express-handlebars');

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
