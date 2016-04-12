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

  var Countdown = function(opt) {
    var defaults = {
      target: '',
      type: 1,
      seconds: 0,
      fullFlag: false
    };

    var options = $.extend(defaults, opt);

    this.options = options;

    this.init(this.options.target, this.options.type, this.options.seconds);
  };

  Countdown.prototype.init = function(target, _type, _seconds) {
    var self = this;
    var seconds = +_seconds || 0;
    var tips = '';
    var countTime = '';
    var countTiming = '';
    var type = _type || 0;
    var $target = document.getElementById(target);

    switch (type) {
      case 1:
        tips = '已结束';
        countTime = self.getLeftTime1(seconds);
        break;
      case 2:
        tips = '活动已结束';
        countTime = self.getLeftTime2(seconds);
        break;
      default:
        tips = '已结束';
        countTime = self.getLeftTime1(seconds);
        break;
    }

    if (seconds > 0) {
      $target.innerHTML = countTime;
      var it = setInterval(function() {
        seconds--;
        if (seconds <= 0) {
          $target.innerHTML = tips;
          clearInterval(it);
          return;
        }
        switch (type) {
          case 1:
            countTiming = self.getLeftTime1(seconds);
            break;
          case 2:
            countTiming = self.getLeftTime2(seconds);
            break;
          default:
            countTiming = self.getLeftTime1(seconds);
            break;
        }
        $target.innerHTML = countTiming;
      }, 1000);
    } else {
      $target.innerHTML = tips;
    }
  };

  Countdown.prototype.get2B = function(_v) {
    var v = +_v;
    var rst = _v;
    if (!isNaN(v)) {
      rst = v >= 10 ? v : '0' + v;
    }
    return rst;
  };

  Countdown.prototype.getEndTime = function(_seconds) {
    var self = this;
    var rst = null;
    var seconds = +_seconds;
    if (!isNaN(seconds) && seconds >= 0) {
      var day = Math.floor(seconds / 3600 / 24);
      var hour = Math.floor(seconds / 3600 % 24);
      var minuter = Math.floor(seconds % 3600 / 60);
      var second = Math.floor(seconds % 3600 % 60);
      if (this.options.fullFlag) {
        rst = {
          d: self.get2B(day),
          h: self.get2B(hour),
          m: self.get2B(minuter),
          s: self.get2B(second)
        };
      } else {
        rst = {
          d: day,
          h: hour,
          m: minuter,
          s: second
        };
      }
    }
    return rst;
  };

  Countdown.prototype.getLeftTime1 = function(_seconds) {
    var self = this;
    var rst = self.getEndTime(_seconds);
    var seconds = +_seconds;
    if (!isNaN(seconds) && seconds >= 0) {
      if (+rst.d > 0) {
        return '剩' + rst.d + '天';
      }
      if (+rst.h > 0) {
        return '剩' + rst.h + '小时';
      }
      if (+rst.m > 0) {
        return '剩' + rst.m + '分钟';
      }
      if (+rst.s > 0) {
        return '剩' + rst.s + '秒';
      }
    }
    return '已结束';
  };

  Countdown.prototype.getLeftTime2 = function(_seconds) {
    var self = this;
    var rst = self.getEndTime(_seconds);
    var seconds = +_seconds;
    if (!isNaN(seconds) && seconds >= 0) {
      if (+rst.d > 0) {
        return rst.d + '天' + rst.h + '小时' + rst.m + '分钟后结束';
      }
      if (+rst.h > 0) {
        return rst.h + '小时' + rst.m + '分钟后结束';
      }
      if (+rst.m > 0) {
        return rst.m + '分钟' + rst.s + '秒后结束';
      }
      if (+rst.s > 0) {
        return rst.s + '秒后结束';
      }
    }
    return '活动已结束';
  };

  this.Countdown = Countdown;

  return Countdown;
}));
