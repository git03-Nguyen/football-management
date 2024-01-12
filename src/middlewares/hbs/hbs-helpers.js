const hbs_sections = require('express-handlebars-sections');
module.exports = {

  section: hbs_sections(),

  ifEquals: function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },

  ifDivisible: function (arg1, arg2, options) {
    return (arg1 % arg2 == 0) ? options.fn(this) : options.inverse(this);
  },

  ifPositive: function (arg1, options) {
    return (arg1 >= 0) ? options.fn(this) : options.inverse(this);
  },

  sum: function (arg1, arg2) {
    return arg1 + arg2;
  },

  notNull: function (arg1, options) {
    return arg1 ? options.fn(this) : options.inverse(this);
  },

  isNull: function (arg1, options) {
    return !arg1 ? options.fn(this) : options.inverse(this);
  }

  // other helpers...


};