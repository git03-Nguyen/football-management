module.exports = {

  ifEquals: function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
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