(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
 /*
  <div class="meetyou-ui-toast">
    <div class="meetyou-ui-message">1</div>
    <div class="meetyou-ui-message">2</div>
    <div class="meetyou-ui-message">3</div>
    <div class="meetyou-ui-message">4</div>
  </div>
  Toast.show(text, duration);
  Toast.hide();

  Loading.show();
  Loading.hide();
  */
  var Message = require('./message');

  function Toast() {
    if (!(this instanceof Toast)) {
      return new Toast();
    }
    this.Messages = [];
    var wraper = document.createElement('div');
    wraper.style = 'position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 1050;display: none;overflow: hidden;-webkit-overflow-scrolling: touch;outline: 0;';
    wraper.className = 'meetyou-ui-toast';
    document.body.appendChild(wraper);
    this.wraper = wraper;
  }

  Toast.prototype.create = function(text, duration) {
    var _duration = (duration === undefined ? 2000 : duration);
    var message = new Message(text, _duration);
    this.Messages.push(message);
    if (this.Messages.length === 1) {
      this.next();
    }
  };

  Toast.prototype.next = function() {
    var self = this;
    var Messages = self.Messages;
    if (Messages.length > 0) {
      self.show();
      var message = Messages[0];
      message.show();
      self.current = message;
      setTimeout(function() {
        delete self.current;
        message.hide();
        Messages.shift();
        self.next();
      }, message.duration);
    } else {
      self.hide();
    }
  };

  Toast.prototype.show = function() {
    this.wraper.style.display = 'block';
  };

  Toast.prototype.hide = function() {
    this.wraper.style.display = 'none';
    if (this.current) {
      this.current.hide();
    }
  };

  Toast.prototype.destory = function() {
  };

  Toast.show = function(text, duration) {
    var current = Toast.current;
    if (!current) {
      current = Toast.current = new Toast();
      current.create({
        text: text,
        duration: duration,
        wraper: current.wraper
      });
    } else {
      current.create({
        text: text,
        duration: duration,
        wraper: current.wraper
      });
    }
    return current;
  };

  Toast.hide = function() {
    if (Toast.current) {
      Toast.current.hide();
    }
  };

  var MeetYou = window.MeetYou || {};
  MeetYou.Toast = Toast;
  window.MeetYou = MeetYou;
  return Toast;
}));
