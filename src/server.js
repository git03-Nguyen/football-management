require('dotenv').config();
const express = require('express');
const app = express();

require('./middlewares/hbs/hbs.mw')(app);

const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routers/home.r'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});