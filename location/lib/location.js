(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
  var location = window.location;
  var query = require('../../query');
  location.query = query(location.search);
  return location;
}));
