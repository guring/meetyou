(function utilFactory(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory.call(global);
  }
}(this, function utilExports() {
  // need require jquery
  if (!window.jQuery) {
    throw 'need require jquery';
  }

  // need require overlay
  if (!window.Overlay) {
    throw 'need require overlay';
  }

  var empty = function() {};

  function Toast(text, settings) {
    var defaults = {
      zIndex: 1000,
      text: '',
      duration: 5000,
      callback: empty,
      autoClose: true,
      autoRemove: true,
      overlay: '',
      mask: true
    };

    var options = $.extend(defaults, settings, true);
    if (options.mask) {
      options.zIndex = 10000;
    }
    var view = $('<div class="ui-toast">' + text + '</div>');
    view.appendTo('body').css('margin', '-' + view.height() / 2 + 'px 0 0 -' + view.width() / 2 + 'px');

    if (options.mask) {
      options.overlay = new Overlay(options.zIndex - 1, false);
    }

    this.text = text;
    this.options = options;
    this.view = view;
    this.init();
  }

  Toast.prototype.init = function() {
    this.show();
  };

  Toast.prototype.show = function() {
    this.view.show();
    if (this.options.mask) {
      this.options.overlay.show();
    }
    this.timeout();
    return this;
  };

  Toast.prototype.hide = function() {
    this.view.hide();
    if (this.options.mask) {
      this.options.overlay.hide();
    }
    if (this.options.autoRemove) {
      this.remove();
    }
    if (this.options.callback) {
      this.options.callback.call(this);
    }
    return this;
  };

  Toast.prototype.timeout = function() {
    var that = this;

    if (!that.options.autoClose) {
      return that;
    }
    setTimeout(function() {
      that.hide();
    }, that.options.duration);

    return that;
  };

  Toast.prototype.text = function(text) {
    if (!text) {
      return this.text;
    }
    this.text = text;
    this.view.html(text);
    return this;
  };

  Toast.prototype.remove = function() {
    this.view.remove();
    if (this.options.mask) {
      this.options.overlay.destroy();
    }
  };

  this.Toast = Toast;

  return Toast;
}));
