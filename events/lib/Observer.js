var undef;
function Observer(cfg) {
  this.config = cfg || {};
}

function reduce(arr, callback, initialValue) {
  var len = arr.length;
  if (typeof callback !== 'function') {
    throw new TypeError('callback is not function!');
  }
  // no value to return if no initial value and an empty array
  if (len === 0 && arguments.length === 2) {
    throw new TypeError('arguments invalid');
  }

  var k = 0;
  var accumulator;
  if (arguments.length >= 3) {
    accumulator = initialValue;
  } else {
    do {
      if (k in arr) {
        accumulator = arr[k++];
        break;
      }

      // if array contains no values, no initial value to return
      k += 1;
      if (k >= len) {
        throw new TypeError();
      }
    }
    while (true);
  }

  while (k < len) {
    if (k in arr) {
      accumulator = callback.call(undef, accumulator, arr[k], k, arr);
    }
    k++;
  }

  return accumulator;
}

Observer.prototype = {
  constructor: Observer,
  equals: function(s2) {
    var self = this;
    return !!reduce(self.keys, function(v, k) {
      return v && (self.config[k] === s2.config[k]);
    }, 1);
  },
  simpleNotify: function(event, ce) {
    var ret,
      self = this,
      config = self.config;
    ret = config.fn.call(config.context || ce.currentTarget, event, config.data);
    if (config.once) {
      ce.removeObserver(self);
    }
    return ret;
  },
  notifyInternal: function(event, ce) {
    var ret = this.simpleNotify(event, ce);
    if (ret === false) {
      event.halt();
    }
    return ret;
  },
  notify: function(event, ce) {
    var self = this,
      config = self.config,
      _ksGroups = event._ksGroups;
    if (_ksGroups && (!config.groups || !(config.groups.match(_ksGroups)))) {
      return undef;
    }

    return self.notifyInternal(event, ce);
  }
};

module.exports = Observer;
