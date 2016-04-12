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

  var empty = function() {};

  var Loading = function(opt) {
    var defaults = {
      callback: empty
    };

    var options = $.extend(defaults, opt);

    var view = $(
      '<div class="ui-loading">' +
        '<div class="ui-loading-bounce">' +
          '<div class="ui-loading-bounce-child ui-loading-bounce1"></div>' +
          '<div class="ui-loading-bounce-child ui-loading-bounce2"></div>' +
          '<div class="ui-loading-bounce-child ui-loading-bounce3"></div>' +
        '</div>' +
      '</div>'
    );
    view.appendTo('body');

    this.options = options;
    this.view = view;

    this.init();
  };

  Loading.prototype.init = function() {
    this.show();
  };

  Loading.prototype.show = function() {
    if (!this.isopen) {
      this.isopen = true;
      this.view.show();
    }
    return this;
  };

  Loading.prototype.hide = function() {
    if (this.isopen) {
      this.isopen = false;
      this.view.hide();
      if (this.options.callback) {
        this.options.callback.call(this);
      }
      return this;
    }
    return false;
  };

  Loading.prototype.destroy = function() {
    this.view.remove();
  };

  this.Loading = Loading;

  return Loading;
}));
