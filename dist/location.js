/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(4);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	(function __init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function __factory() {
	  var location = window.location;
	  var query = __webpack_require__(5);
	  location.query = query(location.search);
	  return location;
	}));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports) {

	(function __init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function __factory() {
	  var parse = function(input, flag) {
	    if (input === null || input === '') {
	      return {};
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


/***/ }
/******/ ]);