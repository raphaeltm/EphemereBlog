module.exports = function deprecate(fn, message) {
  var warned = false;

  function deprecated() {
    if (!warned) {
      /* eslint no-console:0 */
      console.log(message);
      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};
