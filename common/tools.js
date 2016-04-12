var _ = require('underscore');

_.queryParams = function(url) {
  var result = {},
    queryString = url || window.location.search.slice(1),
    re = /([^&=]+)=([^&]*)/g,
    m;

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }

  return result;
};

module.exports = _;
