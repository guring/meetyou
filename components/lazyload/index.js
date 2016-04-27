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

  var liveOnStage = require('live-on-stage');
  var lazyLoadImages = require('lazy-load-images');

  var Lazyload = function(opt) {
    var ATTR = 'data-lazy-load-src';

    var defaults = {
      attr: ATTR,
      selector: 'img[' + ATTR + ']',
      lazyLoaded: 'lazy-loaded'
    };

    var options = $.extend(defaults, opt);

    this.options = options;

    this.init();
  };

  Lazyload.prototype.init = function() {
    this.track();
    this.initAndRefresh();
  };

  Lazyload.prototype.track = function() {
    var self = this;
    liveOnStage.track(this.options.selector, function(element) {
      var src = element.getAttribute(self.options.attr);

      element.addEventListener('load', function() {
        self.addLoadedClass(element);
      });

      if (element.complete) {
        self.addLoadedClass(element);
      }

      element.setAttribute('src', src);

      return true;
    });
  };

  Lazyload.prototype.initAndRefresh = function() {
    if (!lazyLoadImages) {
      lazyLoadImages.init();
    } else {
      setTimeout(function() {
        lazyLoadImages.refresh();
      }, 500);
    }
  };

  Lazyload.prototype.addLoadedClass = function(element) {
    var elem = element;
    if (elem.classList) {
      elem.classList.add(this.options.lazyLoaded);
    } else {
      elem.className += ' ' + this.options.lazyLoaded;
    }
    return elem;
  };

  Lazyload.prototype.refresh = function() {
    liveOnStage.refresh(this.options.selector);
  };

  Lazyload.lazy = function() {
    if (!lazyLoadImages) {
      lazyLoadImages.init();
    } else {
      setTimeout(function() {
        lazyLoadImages.refresh();
      }, 500);
    }
  };

  Lazyload.create = function(arg) {
    return new Lazyload(arg);
  };

  this.Lazyload = Lazyload;

  return Lazyload;
}));
