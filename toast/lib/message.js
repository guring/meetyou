function Message(options) {
  if (!(this instanceof Message)) {
    return new Message(options);
  }
  this.guid = (+new Date());
  this.text = options.text;
  this.visable = false;
  this.duration = options.duration;
  var _destory = options.destory;
  if (_destory === undefined) {
    _destory = true;
  }
  this.autoDestory = _destory;
  var div = document.createElement('div');
  var style = 'background-color:rgba(0,0,0,0.735);color:rgba(255,255,255,1);word-break: break-word;width: 60%;margin: 3px auto;text-align: center;padding: 1em;border: 1px solid transparent;border-radius: 4px;';
  div.style = style;
  // 'border-radius: 3px;color: rgb(255, 255, 255);width: auto;max-width: 80%;margin: 0px auto;background-color: rgb(0, 0, 0);text-align: center;line-height: 2em;top: 50%;position: absolute;left: 50%;padding: 0 2em;word-break: break-word;';
  div.className = 'meetyou-ui-message';
  div.innerHTML = this.text;
  this.dom = div;
  this.wraper = options.wraper || document.body;
  this.wraper.appendChild(div);
}

Message.prototype.show = function() {
  this.visable = true;
  this.dom.style.display = '';
};

Message.prototype.hide = function() {
  this.visable = false;
  this.dom.style.display = 'none';
  if (this.autoDestory) {
    this.destory();
  }
};

Message.prototype.destory = function() {
  var self = this;
  var dom = self.dom;
  console.log(self);
  var parent = this.wraper;
  setTimeout(function() {
    parent.removeChild(dom);
  }, 0);
};
module.exports = Message;
