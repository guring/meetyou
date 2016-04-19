function panel(options) {
  var config = options || {};
  this.config = config;
  return this.init();
}

panel.prototype.init = function init() {
  var style = '';
  var div = document.createElement('div');
  div.style = style;
  div.addEventListener('click', this.click, false);
  document.body.appendChild(div);
  this.dom = div;
};

panel.prototype.onClick = function click() {
  if (this.config.onClick) {
    this.config.onClick.call(this, arguments);
  }
};

panel.prototype.show = function show() {
  this.visable = true;
  this.dom.style.display = '';
};

panel.prototype.hide = function hide() {
  this.visable = false;
  this.dom.style.display = 'none';
};

module.exports = panel;
