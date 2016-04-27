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
      callback: empty,
      text: ''
    };

    var options = $.extend(defaults, opt);

    var view = $(
      '<div class="ui-loading hidden">' +
        '<div class="ui-loading-wrap">' +
          '<div class="ui-loading-bounce">' +
            '<div class="ui-loading-bounce-child ui-loading-bounce1"></div>' +
            '<div class="ui-loading-bounce-child ui-loading-bounce2"></div>' +
            '<div class="ui-loading-bounce-child ui-loading-bounce3"></div>' +
          '</div>' +
          '<div class="ui-tips">' + options.text + '</div>' +
        '</div>' +
      '</div>'
    );
    view.appendTo('body');

    this.options = options;
    this.view = view;
  };

  Loading.prototype.show = function(text) {
    if (!this.isopen) {
      this.view.find('.ui-tips').html(text);
      this.isopen = true;
      this.view.removeClass('hidden');
    }
    return this;
  };

  Loading.prototype.hide = function() {
    if (this.isopen) {
      this.isopen = false;
      this.view.addClass('hidden');
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

  Loading.create = function(arg) {
    return new Loading(arg);
  };

  this.Loading = Loading;

  return Loading;
}));
