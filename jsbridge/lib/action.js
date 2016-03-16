// Load MeiYouJSBridge module
require('./bridge');

var MeiYouJSBridge = window.MeiYouJSBridge;

module.exports = {
  //点击事件
  mobclick: function(name) {
    MeiYouJSBridge.invoke('mobclick/' + name, {});
  },
  //返回上一页
  goback: function() {
    MeiYouJSBridge.invoke('goback', {});
  },
  //返回栈顶
  gobackTop: function() {
    MeiYouJSBridge.invoke('goback/top', {});
  },
  //
  gobackDismiss: function() {
    MeiYouJSBridge.invoke('goback/dismiss', {});
  },
  //直接发出协议
  callBridge: function(href) {
    MeiYouJSBridge.callBridge(href);
  },

  //打开分享界面
  openShareView: function(options) {
    MeiYouJSBridge.invoke('share', options);
  },
  //打开每日签到
  openSignupView: function() {
    MeiYouJSBridge.invoke('signup');
  },
  //打开webview 
  openWebView: function(url, topbar) {
    if (topbar) {
      MeiYouJSBridge.invoke('web', {
        url: url
      });
    } else {
      MeiYouJSBridge.invoke('web/cool', {
        url: url
      });
    }
  },
  //电商业务的webview
  openEbWebView: function(url, topbar) {
    if (topbar) {
      MeiYouJSBridge.invoke('ebweb', {
        url: url
      });
    } else {
      MeiYouJSBridge.invoke('ebweb/cool', {
        url: url
      });
    }
  },
  //打开native-login
  openLoginView: function() {
    MeiYouJSBridge.invoke('login', {});
  },
  //打开tae购物车
  openTaeShoppingCart: function() {
    MeiYouJSBridge.invoke('tae/my/cart', {});
  },
  //
  openTaeDetail: function(itemId) {
    MeiYouJSBridge.invoke('tae/item/detail', {
      itemId: itemId
    });
  },
  //打开sdk-淘宝订单
  openTaeOrders: function() {
    MeiYouJSBridge.invoke('tae/my/cart', {});
  },
  //提交sdk-Tae订单
  postTaeOrder: function(options) {
    MeiYouJSBridge.invoke('tae/order/post', options);
  },
  //获取用户信息
  getUserInfo: function(callback) {
    MeiYouJSBridge.wait('userInfo/get', {}, callback);
  },

  //打开日历
  openRecordView: function() {
    MeiYouJSBridge.invoke('record', {});
  },
  //我的首页
  openMineView: function() {
    MeiYouJSBridge.invoke('me', {});
  },
  //我的首页
  openHomeView: function() {
    MeiYouJSBridge.invoke('home', {});
  },
  //商城首页
  openMallView: function() {
    MeiYouJSBridge.invoke('sale', {});
  },
  //我的柚币
  openYoubiView: function() {
    MeiYouJSBridge.invoke('youbi');
  },
  //柚币专场
  openYoubiSessionView: function() {
    MeiYouJSBridge.invoke('youbi/session');
  },
  //她她圈首页
  openCircleView: function() {
    MeiYouJSBridge.invoke('circles', {});
  },
  //打开native-circle
  openCircleDetail: function(groupID) {
    MeiYouJSBridge.invoke('circles/group', {
      groupID: groupID
    });
  },
  //打开native-topic
  openTopicDetail: function(topicID, floorID) {
    MeiYouJSBridge.invoke('circles/group/topic', {
      topicID: topicID,
      floorID: floorID || ''
    });
  },

  //注册右上角的按钮
  topBarRightButton: function(data, callback) {
    MeiYouJSBridge.listen('topbar/rightButton', data, callback);
  },
  //开启下拉刷新
  openPullRefresh: function() {
    MeiYouJSBridge.invoke('pullRefresh/open');
  },
  //开启下拉刷新
  closePullRefresh: function() {
    MeiYouJSBridge.invoke('pullRefresh/close');
  },
  //是否有安装支付宝
  getAlipayInstalled: function(callback) {
    MeiYouJSBridge.wait('pay/install/alipay', {}, callback);
  },
  //是否有安装微信
  getWechatInstalled: function(callback) {
    MeiYouJSBridge.wait('pay/install/wechat', {}, callback);
  },
  //开启支付通道
  payGoback: function(callback) {
      MeiYouJSBridge.wait('pay/goback', {}, callback);
  }
};

