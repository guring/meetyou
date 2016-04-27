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

  var Overlay = function(zindex, removeOnHide) {
    var defaults = {
      zIndex: 299,
      removeOnHide: false
    };

    var options = $.extend(defaults, {
      zIndex: zindex,
      removeOnHide: removeOnHide === 'undefined' ? false : removeOnHide
    });

    var view = $('<div class="ui-overlay hidden"></div>');
    view.appendTo('body');

    view.on('click', function() {
      if (options.removeOnHide) {
        view.destroy();
      }
    });

    this.options = options;
    this.view = view;
  };

  Overlay.prototype.show = function() {
    if (!this.isopen) {
      this.isopen = true;
      this.view.removeClass('hidden');
    }
    return this;
  };

  Overlay.prototype.hide = function() {
    if (this.isopen && 1) {
      this.isopen = false;
      this.view.addClass('hidden');
      return this;
    }
    return false;
  };

  Overlay.prototype.destroy = function() {
    this.view.remove();
  };

  Overlay.create = function(zindex, removeOnHide) {
    return new Overlay(zindex, removeOnHide);
  };

  this.Overlay = Overlay;

  return Overlay;
}));
