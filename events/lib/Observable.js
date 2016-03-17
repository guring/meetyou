function Observable(cfg) {
  var self = this;
  self.currentTarget = null;
  mix(self, cfg);
  self.reset();
}

function mix(to, from) {
  for (var i in from) {
    to[i] = from[i];
  }
  return to;
}

Observable.prototype = {
  constructor: Observable,
  hasObserver: function() {
    return !!this.observers.length;
  },
  reset: function() {
    var self = this;
    self.observers = [];
  },
  removeObserver: function(observer) {
    var self = this,
      i,
      observers = self.observers,
      len = observers.length;
    for (i = 0; i < len; i++) {
      if (observers[i] === observer) {
        observers.splice(i, 1);
        break;
      }
    }
    self.checkMemory();
  },
  checkMemory: function() {},
  findObserver: function(observer) {
    var observers = this.observers,
      i;

    for (i = observers.length - 1; i >= 0; --i) {
      if (observer.equals(observers[i])) {
        return i;
      }
    }

    return -1;
  }
};

module.exports = Observable;
