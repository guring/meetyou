(function __init(global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    factory();
  }
}(this, function __factory() {
  var Query = require('../../query');

  var parse = function(search) {
    var query = new Query(search, true);
    var platform = {
      appid: query.app_id,
      cn: 'unknown',
      appkey: 'unknown',
      platform: 'unknown',
      version: 'unknown'
    };
    platform.version = query.v || query.version;

    switch (query.app_id) {
      case 1:
      case '1':
      case '01':
        platform.platform = 'jingqi';
        platform.cn = '美柚经期';
        platform.appkey = 'meet_you';
        break;
      case 2:
      case '2':
      case '02':
        platform.platform = 'yunqi';
        platform.cn = '柚宝宝孕育';
        platform.appkey = 'meet_you_client';
        break;
      case 3:
      case '3':
      case '03':
        platform.platform = 'o2o_merchants';
        platform.cn = 'o2o商家端';
        platform.appkey = 'o2o_shop';
        break;
      case 4:
      case '4':
      case '04':
        platform.platform = 'shoushen';
        platform.cn = '美柚瘦身';
        platform.appkey = 'slim';
        break;
      case 5:
      case '5':
      case '05':
        platform.platform = 'yuer';
        platform.cn = '美柚育儿';
        platform.appkey = 'baby';
        break;
      case 6:
      case '6':
      case '06':
        platform.platform = 'jingqi_pro';
        platform.cn = '美柚经期PRO';
        platform.appkey = 'meet_you_pro';
        break;
      case 7:
      case '7':
      case '07':
        platform.platform = 'youzijie';
        platform.cn = '柚子街';
        platform.appkey = 'meet_you_shop';
        break;
      case 8:
      case '8':
      case '08':
        platform.platform = 'yunqi_pro';
        platform.cn = '美柚孕期PRO';
        platform.appkey = 'meet_you_client_pro';
        break;
      case 9:
      case '9':
      case '09':
        platform.platform = 'youzijie_pro';
        platform.cn = '柚子街PRO';
        platform.appkey = 'meet_you_shop_pro';
        break;
      default:
        break;
    }

    return platform;
  };

  var Platform = function() {
  };

  Platform.parse = parse;

  if (typeof window === 'object') {
    var MeetYou = window.MeetYou || {};
    MeetYou.Platform = Platform.parse(location.search);
    window.MeetYou = MeetYou;
  }

  return Platform;
}));
