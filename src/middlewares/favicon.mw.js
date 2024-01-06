const favicon = require('serve-favicon');
const path = require('path');

module.exports = function (app) {
  app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
};