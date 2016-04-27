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

  var Overlay = require('./overlay');
  var $doc = $(document);

  var Dialog = function(opt) {
    var defaults = {
      title: '',
      ok: null,
      cancel: null,
      okValue: 'ok',
      cancelValue: 'cancel',
      okId: 'J_dialog_ok',
      cancelId: 'J_dialog_cancel',
      mask: true,
      isScroll: false,
      overlay: '',
      innerHTML: ''
    };

    var options = $.extend(defaults, opt);

    var view = $('<div class="ui-dialog hidden" id="J_dialog"><div class="line-bottom ui-dialog-title">' + options.title + '</div><div class="ui-dialog-content">' + options.innerHTML + '</div><div class="ui-dialog-footer clearfix"><div class="btn btn-cancel ui-dialog-cancel" id="' + options.cancelId + '">' + options.cancelValue + '</div><div class="btn btn-ok ui-dialog-ok" id="' + options.okId + '">' + options.okValue + '</div></div>');

    view.appendTo('body');

    this.view = view;
    this.options = options;

    if (this.options.mask) {
      this.overlay = new Overlay(options.zIndex - 1, false);
    }

    $doc.on('click', '#' + options.cancelId, options.cancel);
    $doc.on('click', '#' + options.okId, options.ok);
  };

  Dialog.prototype.show = function() {
    this.view.removeClass('hidden');

    if (this.options.mask) {
      this.overlay.show();
    }

    if (!this.options.isScroll) {
      $('body').css('overflow-y', 'hidden');
      $('body').on('touchmove', function(e) {
        e.preventDefault();
      });
    }

    return this;
  };

  Dialog.prototype.hide = function() {
    this.view.addClass('hidden');

    if (this.options.mask) {
      this.overlay.hide();
    }

    if (!this.options.isScroll) {
      $('body').css('overflow-y', 'auto');
      $('body').unbind('touchmove');
    }

    return this;
  };

  Dialog.prototype.destroy = function() {
    var options = this.options;
    $doc.off('click', '#' + options.cancelId, options.cancel);
    $doc.off('click', '#' + options.okId, options.ok);

    this.view.remove();

    if (this.options.mask) {
      this.overlay.destroy();
    }

    if (!this.options.isScroll) {
      $('body').css('overflow-y', 'auto');
      $('body').off('touchmove');
    }

    return this;
  };

  Dialog.create = function(arg) {
    return new Dialog(arg);
  };

  this.Dialog = Dialog;

  return Dialog;
}));
