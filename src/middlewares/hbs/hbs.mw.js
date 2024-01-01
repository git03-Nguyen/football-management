const path = require('path');
const exphbs = require('express-handlebars');

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: require('./hbs-helpers'),
  partialsDir: [path.join(__dirname, '../../views/partials')],
  layoutsDir: path.join(__dirname, '../../views/layouts'),
  defaultLayout: 'main',
});

module.exports = function (app) {
  app.set('view engine', hbs.extname);
  app.engine(hbs.extname, hbs.engine);
  app.set('views', path.join(__dirname, '../../views'));
};