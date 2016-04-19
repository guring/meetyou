(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
  // parse input
  var parse = function(input, flag) {
    if (input === null || input === '') {
      return {};
    }
    if ((typeof input) !== 'string') {
      throw new TypeError('invalidate arguments[0]');
    }
    var reg = new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g');
    var result;
    var query = {};
    result = input.match(reg);
    for (var i = 0; i < result.length; i++) {
      var temp = result[i].substring(1);
      var arr = temp.split('=');
      var value = arr[1];
      if (flag === true) {
        value = decodeURIComponent(value);
      }
      query[arr[0]] = value;
    }
    return query;
  };

  var stringify = function(query, flag) {
    if (query === null || query === undefined) {
      return '';
    }
    if ((typeof query) !== 'object') {
      throw new TypeError('invalidate arguments[0]');
    }
    var search = '';
    for (var key in query) {
      if (query.hasOwnProperty(key)) {
        var temp = '&' + key + '=' + encodeURIComponent(query[key]);
        search += temp;
      }
    }
    if (flag) {
      search = search.substring(1);
    }
    return search;
  };

  var Query = function(input, flag) {
    if ((this instanceof Query) === false) {
      return new Query(input, flag);
    }
    var value = parse(input, flag);
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        this[key] = value[key];
      }
    }
    return this;
  };

  Query.parse = Query;

  Query.stringify = stringify;

  return Query;
}));
