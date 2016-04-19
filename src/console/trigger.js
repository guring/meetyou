/* eslint-disable */
function trigger(options) {
  var config = options || {};
  this.config = config;
  return this.init();
}

trigger.prototype.init = function init() {
  var style = 'position:absolute;width:50px;height:50px;background:rgba(0,0,0,0.5);border-radius:25px;';
  var div = document.createElement('div');
  div.style = style;
  div.addEventListener('click', this.click, false);
  document.body.appendChild(div);
};

trigger.prototype.click = function click() {
  if (this.config.onClick) {
    this.config.onClick.call(this, arguments);
  }
};

trigger.prototype.show = function show() {
  this.config.visable = true;
  this.dom.style.display = '';
};

trigger.prototype.hide = function hide() {
  this.config.visable = false;
  this.dom.style.display = 'none';
};


module.exports = trigger;
