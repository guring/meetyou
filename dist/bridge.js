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

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function __init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function __factory() {
	  var base64 = __webpack_require__(2);
	  var bridge = window.MeiYouJSBridge || {};
	  var scheme = 'meiyou:///';
	  var _readyList = [];
	  var _waitList = {};
	  var _listenList = {};
	  var has = Object.prototype.hasOwnProperty;
	  var defaultConfig = {
	    debug: false
	  };
	  window.base64 = base64;
	  bridge.isReady = false;
	  bridge.version = '0.0.1';
	  bridge.app = {
	    project: '{{project}}',
	    channel: '{{channel}}',
	    version: '{{version}}',
	    platform: '{{platform}}',
	    os: '{{os}}',
	    mac: '{{mac}}'
	  };

	  function log(message) {
	    var div = document.getElementById('bridge-debug-node');
	    var pre = document.createElement('pre');
	    var msg;
	    if (!bridge.config.debug) {
	      return;
	    }
	    if (window.console) {
	      window.console.log(message);
	    }
	    if (typeof message === 'object') {
	      msg = JSON.stringify(message);
	    }
	    if (!div) {
	      div = document.createElement('div');
	      div.setAttribute('id', 'bridge-debug-node');
	      div.style.cssText = 'position:absolute;bottom:0px;left:0px;width:100%;padding:10px;background:rgba(0, 0, 0, .33);';
	      document.body.appendChild(div);
	    }
	    pre.innerHTML = msg;
	    div.appendChild(pre);
	  }

	  /**
	   * create elements
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  function _createElement(options) {
	    var iframe = document.createElement('iframe');
	    var src = scheme + options.method;
	    if (options.data) {
	      src += '?params=' + base64.urlsafe_b64encode(JSON.stringify(options.data));
	    }
	    iframe.style.display = 'none';
	    iframe.src = src;

	    iframe.onload = iframe.onerror = function() {
	      setTimeout(function() {
	        iframe.parentElement.removeChild(iframe);
	      }, 0);
	    };
	    document.getElementsByTagName('body')[0].appendChild(iframe);
	  }


	  /*
	   * 兼容旧版的方法处理
	   * @param  option {[object]}
	   * @return {[type]}
	   */
	  function _send(option) {
	    if (option !== Object(option) || !option.code) {
	      throw new TypeError('invalid option');
	    }
	    _createElement(option);
	  }

	  /*
	   * 执行方法
	   * @param  {[type]}
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  function _invoke(method, option) {
	    var data = {
	      method: method,
	      data: option
	    };
	    _createElement(data);
	  }

	  /*
	   * 向native 添加注册事件
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  function _listen(listenObject) {
	    _createElement(listenObject);
	  }

	  /*
	   * 向native 删除注册事件
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  function _unlisten(method) {
	    var data = {
	      method: '_unlisten',
	      data: {
	        method: method
	      }
	    };
	    _createElement(data);
	  }

	  function _merge(to, from) {
	    var key;
	    var temp = to;
	    for (key in from) {
	      if (has.call(from, key)) {
	        temp[key] = from[key];
	      }
	    }
	    return temp;
	  }

	  /*
	   * 兼容旧版处理
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  bridge.send = function(option) {
	    _send(option);
	  };

	  /*
	   * 配置信息
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  bridge.init = function(config) {
	    var _config = config || {};
	    var conf = _merge(defaultConfig, _config);
	    var item;
	    if (this.isReady) {
	      log('init fn shuold call once');
	      return;
	    }
	    this.config = conf;
	    while (_readyList.length) {
	      item = _readyList[0];
	      if (typeof item === 'function') {
	        item.apply(this, arguments);
	      }
	      _readyList.shift(_readyList[0]);
	    }

	    this.isReady = true;

	    // dispatch init events
	    var _initEvent = document.createEvent('Events');
	    _initEvent.initEvent('MeiYouJSBridgeInit');
	    _initEvent.bridge = this;
	    document.dispatchEvent(_initEvent);

	    log('[bridge] init');
	  };

	  /*
	   * 注册ready事件
	   * @param  callback   {Function}
	   * @return {[type]}
	   */
	  bridge.ready = function(callback) {
	    _readyList.push(callback);
	    return this;
	  };

	  /*
	   * 注册错误事件
	   * @return {[type]}
	   */
	  bridge.error = function() {

	  };


	  /*
	   * 取消侦听
	   * @param  {[type]}
	   * @return {[type]}
	   */
	  bridge.unlisten = function(method) {
	    _unlisten(method);
	    delete _listenList[method];
	  };

	  /*
	   * 执行方法
	   * 不可等待
	   * @param  method {[string]}
	   * @param  option {[json object]}
	   * @return {[type]}
	   */
	  bridge.invoke = function(method, option) {
	    log('[bridge] invoke ' + method);
	    _invoke(method, option);
	  };

	  /*
	   * 注册等待消息回执的方法
	   * 暂不支持队列消息
	   * @param  method   {[string]}
	   * @param  option   {[object]}
	   * @param  callback {Function}
	   * @return {[type]}
	   */
	  bridge.wait = function(method, option, callback) {
	    log('[bridge] wait ' + method);

	    var now = (new Date()).getTime();
	    var callbackId = method + '-' + now;

	    var waitObject = {
	      callbackId: callbackId,
	      callback: callback,
	      inputData: option,
	      outputData: null,
	      start: now,
	      finish: null,
	      _complete: function() {},
	      timeout: 1000
	    };
	    _waitList[method] = waitObject;
	    _invoke(method, option);
	    return this;
	  };

	  /*
	   * 执行回调消息
	   * 禁止在页面调用
	   * @param  method {[string]}
	   * @param  data {[string of json]}
	   * @return {[type]}
	   */
	  bridge.dispatchWait = function(method, data) {
	    log('[bridge] dispatchWait ' + method);
	    log(data);

	    var waitObject = _waitList[method];
	    if (waitObject && waitObject.callback) {
	      var callback = waitObject.callback;
	      var temp = data;
	      if (typeof data === 'string') {
	        temp = JSON.parse(data);
	      }
	      callback.apply(this, [method, temp]);
	      delete _waitList[method];
	    }
	    return this;
	  };

	  /*
	   * 侦听  *
	   * topbar/rightbutton?params=
	   * @param  method     {[string]}
	   * @param  callback   {Function}
	   * @return {[type]}
	   */
	  bridge.listen = function(method, data, callback) {
	    log('[bridge] listen ' + method);

	    var listenObject = _listenList[method];
	    if (!listenObject) {
	      listenObject = {
	        method: method,
	        data: data,
	        listenList: []
	      };
	    }
	    listenObject.listenList.push(data);
	    listenObject.callback = callback;
	    _listenList[method] = listenObject;
	    _listen(listenObject);
	    return this;
	  };

	  /*
	   * 派发侦听消息
	   * 禁止在页面调用
	   * @param  method {[string]}
	   * @param  data {[string of json]}
	   * @return {[type]}
	   */
	  bridge.dispatchListener = function(method, data) {
	    log('[bridge] dispatchListener ' + method);
	    log(data);
	    var listenObject = _listenList[method];
	    if (listenObject) {
	      var callback = listenObject.callback;
	      if (callback) {
	        var temp = data;
	        if (typeof data === 'string') {
	          temp = JSON.parse(data);
	        }
	        callback.apply(this, [method, temp]);
	      }
	    }
	  };

	  // 直接发出协议请求
	  bridge.callBridge = function(src) {
	    var iframe = document.createElement('iframe');
	    log('[bridge] callBridge ' + src);
	    iframe.style.display = 'none';
	    iframe.src = src;
	    iframe.onload = iframe.onerror = function() {
	      setTimeout(function() {
	        iframe.parentElement.removeChild(iframe);
	      }, 0);
	    };
	    document.getElementsByTagName('body')[0].appendChild(iframe);
	  };

	  /*
	   * dispatch ready Event;
	   */
	  var readyEvent = document.createEvent('Events');
	  readyEvent.initEvent('MeiYouJSBridgeReady');
	  readyEvent.bridge = bridge;
	  document.dispatchEvent(readyEvent);
	  window.MeiYouJSBridge = bridge;
	  window.dispatchListener = bridge.dispatchListener;
	  window.dispatchWait = bridge.dispatchWait;
	}));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports) {

	(function init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function _factory() {
	  var BASE64_MAPPING = [
	    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
	    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
	    'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X',
	    'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
	    'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
	    'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
	    'w', 'x', 'y', 'z', '0', '1', '2', '3',
	    '4', '5', '6', '7', '8', '9', '+', '/'
	  ];

	  /**
	   *ascii convert to binary
	   */
	  var _toBinary = function(ascii) {
	    var binary = new Array();
	    while (ascii > 0) {
	      var b = ascii % 2;
	      ascii = Math.floor(ascii / 2);
	      binary.push(b);
	    }
	    /*
	    var len = binary.length;
	    if(6-len > 0){
	    	for(var i = 6-len ; i > 0 ; --i){
	    		binary.push(0);
	    	}
	    }*/
	    binary.reverse();
	    return binary;
	  };

	  /**
	   *binary convert to decimal
	   */
	  var _toDecimal = function(binary) {
	    var dec = 0;
	    var p = 0;
	    for (var i = binary.length - 1; i >= 0; --i) {
	      var b = binary[i];
	      if (b == 1) {
	        dec += Math.pow(2, p);
	      }
	      ++p;
	    }
	    return dec;
	  };

	  /**
	   *unicode convert to utf-8
	   */
	  var _toUTF8Binary = function(c, binaryArray) {
	    var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
	    var fatLen = binaryArray.length;
	    var diff = mustLen - fatLen;
	    while (--diff >= 0) {
	      binaryArray.unshift(0);
	    }
	    var binary = [];
	    var _c = c;
	    while (--_c >= 0) {
	      binary.push(1);
	    }
	    binary.push(0);
	    var i = 0,
	      len = 8 - (c + 1);
	    for (; i < len; ++i) {
	      binary.push(binaryArray[i]);
	    }

	    for (var j = 0; j < c - 1; ++j) {
	      binary.push(1);
	      binary.push(0);
	      var sum = 6;
	      while (--sum >= 0) {
	        binary.push(binaryArray[i++]);
	      }
	    }
	    return binary;
	  };

	  var __BASE64 = function() {
	  };
	  /**
	   *BASE64 Encode
	   */
	  __BASE64.prototype.encoder = function(str) {
	    var base64_Index = [];
	    var binaryArray = [];
	    for (var i = 0, len = str.length; i < len; ++i) {
	      var unicode = str.charCodeAt(i);
	      var _tmpBinary = _toBinary(unicode);
	      if (unicode < 0x80) {
	        var _tmpdiff = 8 - _tmpBinary.length;
	        while (--_tmpdiff >= 0) {
	          _tmpBinary.unshift(0);
	        }
	        binaryArray = binaryArray.concat(_tmpBinary);
	      } else if (unicode >= 0x80 && unicode <= 0x7FF) {
	        binaryArray = binaryArray.concat(_toUTF8Binary(2, _tmpBinary));
	      } else if (unicode >= 0x800 && unicode <= 0xFFFF) { //UTF-8 3byte
	        binaryArray = binaryArray.concat(_toUTF8Binary(3, _tmpBinary));
	      } else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) { //UTF-8 4byte
	        binaryArray = binaryArray.concat(_toUTF8Binary(4, _tmpBinary));
	      } else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) { //UTF-8 5byte
	        binaryArray = binaryArray.concat(_toUTF8Binary(5, _tmpBinary));
	      } else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) { //UTF-8 6byte
	        binaryArray = binaryArray.concat(_toUTF8Binary(6, _tmpBinary));
	      }
	    }

	    var extra_Zero_Count = 0;
	    for (var i = 0, len = binaryArray.length; i < len; i += 6) {
	      var diff = (i + 6) - len;
	      if (diff == 2) {
	        extra_Zero_Count = 2;
	      } else if (diff == 4) {
	        extra_Zero_Count = 4;
	      }
	      //if(extra_Zero_Count > 0){
	      //	len += extra_Zero_Count+1;
	      //}
	      var _tmpExtra_Zero_Count = extra_Zero_Count;
	      while (--_tmpExtra_Zero_Count >= 0) {
	        binaryArray.push(0);
	      }
	      base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
	    }

	    var base64 = '';
	    for (var i = 0, len = base64_Index.length; i < len; ++i) {
	      base64 += BASE64_MAPPING[base64_Index[i]];
	    }

	    for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
	      base64 += '=';
	    }
	    return base64;
	  };
	  /**
	   *BASE64  Decode for UTF-8
	   */
	  __BASE64.prototype.decoder = function(_base64Str) {
	    var _len = _base64Str.length;
	    var extra_Zero_Count = 0;
	    /**
	     *计算在进行BASE64编码的时候，补了几个0
	     */
	    if (_base64Str.charAt(_len - 1) == '=') {
	      //alert(_base64Str.charAt(_len-1));
	      //alert(_base64Str.charAt(_len-2));
	      if (_base64Str.charAt(_len - 2) == '=') { //两个等号说明补了4个0
	        extra_Zero_Count = 4;
	        _base64Str = _base64Str.substring(0, _len - 2);
	      } else { //一个等号说明补了2个0
	        extra_Zero_Count = 2;
	        _base64Str = _base64Str.substring(0, _len - 1);
	      }
	    }

	    var binaryArray = [];
	    for (var i = 0, len = _base64Str.length; i < len; ++i) {
	      var c = _base64Str.charAt(i);
	      for (var j = 0, size = BASE64_MAPPING.length; j < size; ++j) {
	        if (c == BASE64_MAPPING[j]) {
	          var _tmp = _toBinary(j);
	          /*不足6位的补0*/
	          var _tmpLen = _tmp.length;
	          if (6 - _tmpLen > 0) {
	            for (var k = 6 - _tmpLen; k > 0; --k) {
	              _tmp.unshift(0);
	            }
	          }
	          binaryArray = binaryArray.concat(_tmp);
	          break;
	        }
	      }
	    }

	    if (extra_Zero_Count > 0) {
	      binaryArray = binaryArray.slice(0, binaryArray.length - extra_Zero_Count);
	    }

	    var unicode = [];
	    var unicodeBinary = [];
	    for (var i = 0, len = binaryArray.length; i < len;) {
	      if (binaryArray[i] == 0) {
	        unicode = unicode.concat(_toDecimal(binaryArray.slice(i, i + 8)));
	        i += 8;
	      } else {
	        var sum = 0;
	        while (i < len) {
	          if (binaryArray[i] == 1) {
	            ++sum;
	          } else {
	            break;
	          }
	          ++i;
	        }
	        unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 1, i + 8 - sum));
	        i += 8 - sum;
	        while (sum > 1) {
	          unicodeBinary = unicodeBinary.concat(binaryArray.slice(i + 2, i + 8));
	          i += 8;
	          --sum;
	        }
	        unicode = unicode.concat(_toDecimal(unicodeBinary));
	        unicodeBinary = [];
	      }
	    }
	    var value = '';
	    for (var i = 0; i < unicode.length; i++) {
	      value += String.fromCharCode(unicode[i]);
	    }
	    return value;
	  };

	  /*
	   * replace url safe char + and /
	   */
	  __BASE64.prototype.urlsafe_b64encode = function(input) {
	    return this.encoder(input).replace(/\+/g, '-').replace(/\//g, '_');
	  };

	  /*
	   *
	   */
	  __BASE64.prototype.urlsafe_b64decode = function(input) {
	    return this.decoder(input.replace(/\-/g, '+').replace(/\_/g, '/'));
	  }

	  return new __BASE64();
	}));


/***/ }
/******/ ]);