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

  var Overlay = function(zindex, removeOnHide) {
    var defaults = {
      zIndex: 299,
      removeOnHide: true,
      callback: empty
    };

    var options = $.extend(defaults, {
      zIndex: zindex,
      removeOnHide: removeOnHide === 'undefined' ? true : removeOnHide
    });

    var view = $('<div class="ui-overlay"></div>');
    view.appendTo('body');

    var self = this;

    view.on('click', function() {
      if (self.options.removeOnHide) {
        self.hide();
      }
    });

    this.options = options;
    this.view = view;
    this.init();
  };

  Overlay.prototype.init = function() {
    this.show();
  };

  Overlay.prototype.show = function() {
    if (!this.isopen) {
      this.isopen = true;
      this.view.show();
    }
    return this;
  };

  Overlay.prototype.hide = function() {
    if (this.isopen && 1) {
      this.isopen = false;
      this.view.hide();
      if (this.options.callback) {
        this.options.callback.call(this);
      }
      return this;
    }
    return false;
  };

  Overlay.prototype.destroy = function() {
    this.view.remove();
  };

  this.Overlay = Overlay;

  return Overlay;
}));
