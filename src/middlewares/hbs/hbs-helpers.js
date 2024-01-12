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

  // input: 1 and 4, output: [1, 2, 3, 4]
  range: function (from, to) {
    let res = [];
    for (let i = from; i <= to; i++) {
      res.push(i);
    }
    return res;
  },

  sum: function (arg1, arg2) {
    return (+arg1) + (+arg2);
  },

  substract: function (arg1, arg2) {
    return arg1 - arg2;
  },

  concat: function (arg1, arg2) {
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