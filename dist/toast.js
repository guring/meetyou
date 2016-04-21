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

	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function __init(global, factory) {
	  if (typeof module === 'object' && typeof module.exports === 'object') {
	    module.exports = factory();
	  } else {
	    factory();
	  }
	}(this, function __factory() {
	 /*
	  <div class="meetyou-ui-toast">
	    <div class="meetyou-ui-message">1</div>
	    <div class="meetyou-ui-message">2</div>
	    <div class="meetyou-ui-message">3</div>
	    <div class="meetyou-ui-message">4</div>
	  </div>
	  Toast.show(text, duration);
	  Toast.hide();

	  Loading.show();
	  Loading.hide();
	  */
	  var Message = __webpack_require__(7);

	  function Toast() {
	    if (!(this instanceof Toast)) {
	      return new Toast();
	    }
	    this.Messages = [];
	    var wraper = document.createElement('div');
	    wraper.style = 'position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1050;display: none;overflow: hidden;-webkit-overflow-scrolling: touch;outline: 0;';
	    wraper.className = 'meetyou-ui-toast';
	    document.body.appendChild(wraper);
	    this.wraper = wraper;
	  }

	  Toast.prototype.create = function(text, duration) {
	    var _duration = (duration === undefined ? 2000 : duration);
	    var message = new Message(text, _duration);
	    this.Messages.push(message);
	    if (this.Messages.length === 1) {
	      this.next();
	    }
	  };

	  Toast.prototype.next = function() {
	    var self = this;
	    var Messages = self.Messages;
	    if (Messages.length > 0) {
	      self.show();
	      var message = Messages[0];
	      message.show();
	      self.current = message;
	      setTimeout(function() {
	        delete self.current;
	        message.hide();
	        Messages.shift();
	        self.next();
	      }, message.duration);
	    } else {
	      self.hide();
	    }
	  };

	  Toast.prototype.show = function() {
	    this.wraper.style.display = 'block';
	  };

	  Toast.prototype.hide = function() {
	    this.wraper.style.display = 'none';
	    if (this.current) {
	      this.current.hide();
	    }
	  };

	  Toast.prototype.destory = function() {
	  };

	  Toast.show = function(text, duration) {
	    var current = Toast.current;
	    if (!current) {
	      current = Toast.current = new Toast();
	      current.create({
	        text: text,
	        duration: duration,
	        wraper: current.wraper
	      });
	    } else {
	      current.create({
	        text: text,
	        duration: duration,
	        wraper: current.wraper
	      });
	    }
	    return current;
	  };

	  Toast.hide = function() {
	    if (Toast.current) {
	      Toast.current.hide();
	    }
	  };

	  var MeetYou = window.MeetYou || {};
	  MeetYou.Toast = Toast;
	  window.MeetYou = MeetYou;
	  return Toast;
	}));


/***/ },
/* 7 */
/***/ function(module, exports) {

	function Message(options) {
	  if (!(this instanceof Message)) {
	    return new Message(options);
	  }
	  this.guid = (+new Date());
	  this.text = options.text;
	  this.visable = false;
	  this.duration = options.duration;
	  var _destory = options.destory;
	  if (_destory === undefined) {
	    _destory = true;
	  }
	  this.autoDestory = _destory;
	  var div = document.createElement('div');
	  var style = 'background-color:rgba(0,0,0,0.735);color:rgba(255,255,255,1);word-break: break-word;width: 60%;margin: 3px auto;text-align: center;padding: 1em;border: 1px solid transparent;border-radius: 4px;';
	  div.style = style;
	  // 'border-radius: 3px;color: rgb(255, 255, 255);width: auto;max-width: 80%;margin: 0px auto;background-color: rgb(0, 0, 0);text-align: center;line-height: 2em;top: 50%;position: absolute;left: 50%;padding: 0 2em;word-break: break-word;';
	  div.className = 'meetyou-ui-message';
	  div.innerHTML = this.text;
	  this.dom = div;
	  this.wraper = options.wraper || document.body;
	  this.wraper.appendChild(div);
	}

	Message.prototype.show = function() {
	  this.visable = true;
	  this.dom.style.display = '';
	};

	Message.prototype.hide = function() {
	  this.visable = false;
	  this.dom.style.display = 'none';
	  if (this.autoDestory) {
	    this.destory();
	  }
	};

	Message.prototype.destory = function() {
	  var self = this;
	  var dom = self.dom;
	  console.log(self);
	  var parent = this.wraper;
	  setTimeout(function() {
	    parent.removeChild(dom);
	  }, 0);
	};
	module.exports = Message;


/***/ }
/******/ ]);