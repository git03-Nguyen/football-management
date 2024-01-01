const path = require('path');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./hbs-helpers');

const viewsDir = path.join(__dirname, 'views');
const layoutsDir = path.join(__dirname, '../../views/layouts');
const partialsDir = path.join(__dirname, '../../views/partials');

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: hbsHelpers,
  partialsDir: [partialsDir],
  layoutsDir: layoutsDir,
  defaultLayout: 'main',
});

module.exports = function (app) {
  app.set('view engine', hbs.extname);
  app.engine(hbs.extname, hbs.engine);
  app.set('views', viewsDir);
};