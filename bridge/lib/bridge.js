(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
  var base64 = require('../../base64');
  var JSON = require('../../json');
  var bridge = window.MeiYouJSBridge || {};
  var scheme = 'meiyou:///';
  var _readyList = [];
  var _waitList = {};
  var _listenList = {};
  var has = Object.prototype.hasOwnProperty;
  var defaultConfig = {
    debug: false
  };
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
  bridge.config = defaultConfig;
  function log(message) {
    var id = '____bridge_debug_node';
    var div = document.getElementById(id);
    var pre = document.createElement('pre');
    var msg = message;
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
      div.setAttribute('id', id);
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
    var src = scheme + options.method;
    var timeout = 1000;
    var called = false;
    var callTimeout;
    var iframe = document.createElement('iframe');

    function callback() {
      if (called) {
        return;
      }

      iframe.onload = iframe.onerror = undefined;
      iframe.parentNode.removeChild(iframe);
      if (callTimeout) {
        window.clearTimeout(callTimeout);
        callTimeout = null;
      }

      called = true;
    }

    if (options.data) {
      var data = JSON.stringify(options.data);
      var json = base64.urlsafe_b64encode(data);
      src += '?params=' + json;
    }

    iframe.style.display = 'none';
    iframe.onload = iframe.onerror = callback;
    iframe.src = src;
    callTimeout = window.setTimeout(callback, timeout);
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
    return bridge;
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
    return bridge;
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

  return bridge;
}));
