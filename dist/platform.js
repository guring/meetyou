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

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	(function __init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function __factory() {
	  var Query = __webpack_require__(4);

	  var parse = function(search) {
	    var query = new Query(search, true);
	    var platform = {
	      appid: query.app_id,
	      cn: 'unknown',
	      appkey: 'unknown',
	      platform: 'unknown',
	      version: 'unknown'
	    };
	    platform.version = query.v || query.version;

	    switch (query.app_id) {
	      case 1:
	      case '1':
	      case '01':
	        platform.platform = 'jingqi';
	        platform.cn = '美柚经期';
	        platform.appkey = 'meet_you';
	        break;
	      case 2:
	      case '2':
	      case '02':
	        platform.platform = 'yunqi';
	        platform.cn = '柚宝宝孕育';
	        platform.appkey = 'meet_you_client';
	        break;
	      case 3:
	      case '3':
	      case '03':
	        platform.platform = 'o2o_merchants';
	        platform.cn = 'o2o商家端';
	        platform.appkey = 'o2o_shop';
	        break;
	      case 4:
	      case '4':
	      case '04':
	        platform.platform = 'shoushen';
	        platform.cn = '美柚瘦身';
	        platform.appkey = 'slim';
	        break;
	      case 5:
	      case '5':
	      case '05':
	        platform.platform = 'yuer';
	        platform.cn = '美柚育儿';
	        platform.appkey = 'baby';
	        break;
	      case 6:
	      case '6':
	      case '06':
	        platform.platform = 'jingqi_pro';
	        platform.cn = '美柚经期PRO';
	        platform.appkey = 'meet_you_pro';
	        break;
	      case 7:
	      case '7':
	      case '07':
	        platform.platform = 'youzijie';
	        platform.cn = '柚子街';
	        platform.appkey = 'meet_you_shop';
	        break;
	      case 8:
	      case '8':
	      case '08':
	        platform.platform = 'yunqi_pro';
	        platform.cn = '美柚孕期PRO';
	        platform.appkey = 'meet_you_client_pro';
	        break;
	      case 9:
	      case '9':
	      case '09':
	        platform.platform = 'youzijie_pro';
	        platform.cn = '柚子街PRO';
	        platform.appkey = 'meet_you_shop_pro';
	        break;
	      default:
	        break;
	    }

	    return platform;
	  };

	  var Platform = function() {
	  };

	  Platform.parse = parse;

	  if (typeof window === 'object') {
	    var MeetYou = window.MeetYou || {};
	    MeetYou.Platform = Platform.parse(location.search);
	    window.MeetYou = MeetYou;
	  }

	  return Platform;
	}));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 5 */
/***/ function(module, exports) {

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
	        var temp = '&' + key + '=' + (query[key] ? encodeURIComponent(query[key]) : '');
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