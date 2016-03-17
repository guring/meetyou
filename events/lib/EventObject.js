var FALSE = function() {
  return false;
}
var TRUE = function() {
  return true;
}
var UNDEF;
function EventObject() {
  var self = this;
  self.timeStamp = +Date.now();
  self.target = UNDEF;
  self.currentTarget = UNDEF;
}
EventObject.prototype = {
  isEventObject: 1,
  constructor: EventObject,
  isDefaultPrevented: FALSE,
  isPropagationStopped: FALSE,
  isImmediatePropagationStopped: FALSE,
  preventDefault: function() {
    this.isDefaultPrevented = TRUE;
  },
  stopPropagation: function() {
    this.isPropagationStopped = TRUE;
  },
  stopImmediatePropagation: function() {
    this.isImmediatePropagationStopped = TRUE;
    this.stopPropagation();
  },
  halt: function(immediate) {
    if (immediate) {
      this.stopImmediatePropagation();
    } else {
      this.stopPropagation();
    }
    this.preventDefault();
  }
};

module.exports = EventObject;
