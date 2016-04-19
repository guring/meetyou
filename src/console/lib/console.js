(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
  function Trigger(target) {
    this.target = target;
    return this.init();
  }

  Trigger.prototype.init = function init() {
    var self = this;
    var style = 'position:absolute;width:50px;height:50px;background:rgba(0,0,0,0.5);border-radius:25px;';
    var div = document.createElement('div');
    div.style = style;
    div.addEventListener('click', function() {
      self.onClick.call(self);
    }, false);
    div.innerHTML = '';
    document.body.appendChild(div);
  };

  Trigger.prototype.onClick = function click() {
    if (this.target) {
      this.target.toggle();
    }
  };

  Trigger.prototype.show = function show() {
    this.config.visable = true;
    this.dom.style.display = '';
  };

  Trigger.prototype.hide = function hide() {
    this.config.visable = false;
    this.dom.style.display = 'none';
  };

  function Close(target) {
    this.target = target;
    return this.init();
  }

  Close.prototype.init = function init() {
    var self = this;
    var style = 'position:absolute;width:25px;height:25px;top:0;right:0;z-index:9999;text-align:center;line-height:25px;';
    var div = document.createElement('div');
    div.style = style;
    div.addEventListener('click', function() {
      self.onClick.call(self);
    }, false);
    div.innerHTML = 'x';
    this.dom = div;
    if (this.target) {
      this.target.dom.appendChild(div);
    }
  };

  Close.prototype.onClick = function click() {
    if (this.target) {
      this.target.style.display = 'none';
    }
  };

  function clean(options) {
    var config = options || {};
    this.config = config;
    return this.init();
  }

  clean.prototype.init = function init() {
    var style = 'position:absolute;width:50px;height:50px;background:rgba(0,0,0,1);top:0;left:0;z-index:9999;';
    var div = document.createElement('div');
    div.style = style;
    this.dom = div;
  };

  clean.prototype.onClick = function click() {
    if (this.config.onClick) {
      this.config.onClick.call(this, arguments);
    }
  };


  function Container(target) {
    this.target = target;
    this.length = 0;
    return this.init();
  }

  Container.prototype.init = function init() {
    var style = 'height:100%;width:100%;background:rgba(255,255,255,0.5);overflow:scroll;';
    var div = document.createElement('div');
    div.style = style;
    this.dom = div;
    if (this.target) {
      this.target.dom.appendChild(div);
    }
  };

  Container.prototype.newLine = function(html) {
    var _html = html;
    if (typeof _html === 'object') {
      var cache = [];
      _html = JSON.stringify(_html, function(key, value) {
        var _value = value;
        if (typeof _value === 'object' && _value !== null) {
          if (cache.indexOf(_value) !== -1) {
            return;
          }
          cache.push(_value);
        }
        /* eslint consistent-return: 0 */
        return _value;
      }, '\t');
      cache = null;
    }
    this.dom.innerHTML += ('<pre style="border-bottom:1px solid #cccccc;background:rgba(255,255,255,0.8)">' + (this.length++) + ' : ' + _html + '</pre>');
  };

  function Wrapper(options) {
    var config = options || {};
    this.config = config;
    return this.init();
  }

  Wrapper.prototype.init = function init() {
    var style = 'position:absolute;width:100%;height:50%;background:rgba(0,0,0,0.5);bottom:0;z-index:9998;display:none;';
    var div = document.createElement('div');
    div.style = style;
    div.className = 'Wrapper';

    this.dom = div;
    this.Trigger = new Trigger(this);
    this.Close = new Close(this);
    this.Container = new Container(this);
    this.dom.appendChild(this.Close.dom);
    this.dom.appendChild(this.Container.dom);

    document.body.appendChild(div);
  };
  Wrapper.prototype.toggle = function() {
    var display = this.visable ? 'none' : '';
    this.visable = !this.visable;
    this.dom.style.display = display;
  };

  Wrapper.prototype.hide = function() {};

  var panel = new Wrapper();

  var Console = {
    log: function(message) {
      panel.Container.newLine(message);
    },
    error: function(message) {
      panel.Container.newLine(message);
    },
    info: function(message) {
      panel.Container.newLine(message);
    },
    show: function() {

    },
    hide: function() {
      panel.hide();
    }
  };

  var _console = window.console;
  Console._console = _console;
  window.console = Console;
  return Console;
}));
