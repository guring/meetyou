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

  var Totop = function(opt) {
    var defaults = {
      autohide: true,
      offset: 100,
      speed: 300,
      duration: 100,
      callback: empty
    };

    var options = $.extend(defaults, opt);

    var view = $('<div class="ui-totop"><a title="返回顶部">返回顶部</a></div>');
    view.appendTo('body');

    var win = $(window);
    var doc = $('html, body');

    if (options.autohide) {
      view.css('display', 'none');
    }

    view.on('click', function() {
      doc.animate({
        scrollTop: 0
      }, options.speed);
      if (options.callback) {
        options.callback.call(this);
      }
    });

    win.on('scroll', function() {
      var scrolling = win.scrollTop();
      if (options.autohide) {
        setTimeout(function() {
          if (scrolling > options.offset) {
            view.fadeIn(options.speed);
          } else {
            view.fadeOut(options.speed);
          }
        }, options.duration);
      }
    });
  };

  Totop.create = function(arg) {
    return new Totop(arg);
  };

  this.Totop = Totop;

  return Totop;
}));
