function submit(options) {

	switch (options.code) {
		/*
		 * post TAE orders
		 */
		case '3001':
			post_order(options);
			break;
		case '3000':
			/*
			 *open TAE host detail webview
			 * item_id:item_id
			 * type:shoptype
			 */
			open_tae_item_detail(options);
			break;
		case '1000':
			goto_back(options);
			break;
		case '1001':
			goto_ubee_task(options);
			break;
		case '1002':
			goto_adress(options);
			break;
		case '1003':
			goto_userinfo(options);
			break;
		case '1004':
			success_Invitation(options);
			break;
		case '1005':
			get_Invitation_friends(options);
			break;
		case '1006':
			share_qzone(options);
			break;
		case '1007':
			share_weibo(options);
			break;
			//todo share to wechat friend
		case '1008':
			goto_EveryDaySign(options);
			break;
		case '1009':
			goto_Complaint(options);
			break;
		case '1010':
			goto_Calendar(options);
			break;
		case '1011':
			goto_BaiBox(options);
			break;
		case '1012':
			goto_Login(options);
			break;
		case '1013':
			goto_sweet_friends(options);
			break;
		case '1014':
			goto_Comments(options);
			break;
		case '1015':
			share_success(options);
			break;
		case '1016':
			get_invitation(options);
			break;
		case '1019':
			share_wechat_timeline(options);
			break;
		case '1024':
			share_wechat_friend(options);
			break;
		case '1020':
			Success_Exchange(options);
			break;
		case '1021':
			goto_BindAccount(options);
			break;
		case '1022':
			Share_ShenMiao(options);
			break;
		case '1023':
			goto_YoubiExchange(options);
			break;
		case '1050':
			goto_topic(options);
			break;

		case '2000':
			goto_circles_home(options);
			break;
		case '2001':
			share_tools(options);
			break;
		case '2100':
			goto_skin(options);
			break;
			/*
			 *open new web view
			 * options:		url 	string
			 * 				param	string
			 */
		case '4000':
			open_webview(options);
			break;

		default:
			break;
	}
}

function add_iframe(options) {
	var iframe = document.createElement('iframe');
	var json = encodeURIComponent(JSON.stringify(options));
	iframe.src = "xiyou::success::" + json;
	iframe.onload = function() {
		setTimeout(function() {

		}, 0);
	};
	document.body.appendChild(iframe);
}

function open_webview(options) {
	console.log('sdk.open_webview');

	add_iframe(options);
};

function goto_back(options) {
	console.log('sdk.goto_back');
	add_iframe(options);
}

function goto_ubee_task(options) {
	add_iframe(options);
}

function goto_adress(options) {
	add_iframe(options);
}

function goto_userinfo(options) {
	add_iframe(options);
}

function goto_skin(options) {
	add_iframe(options);
}

function goto_EveryDaySign(options) {
	add_iframe(options);
}

function success_Invitation(options) {
	add_iframe(options);
}

function get_Invitation_friends(options) {
	add_iframe(options);
}

function goto_Complaint(options) {
	add_iframe(options);
}

function goto_Calendar(options) {
	add_iframe(options);
}

function goto_BaiBox(options) {
	add_iframe(options);
}

function goto_Login(options) {
	add_iframe(options);
}

function goto_Comments(options) {
	add_iframe(options);
}

function Success_Exchange(options) {
	add_iframe(options);
}

function goto_BindAccount(options) {
	add_iframe(options);
}

function Share_ShenMiao(options) {
	add_iframe(options);
}

function goto_YoubiExchange(options) {
	add_iframe(options);
}

function goto_sweet_friends(options) {
	add_iframe(options);
}

function goto_circles_home(options) {
	add_iframe(options);
}

function goto_topic(options) {
	add_iframe(options);
}

function get_invitation(options) {
	add_iframe(options);
}

function share_qzone(options) {
	add_iframe(options);
}

function share_success(options) {
	add_iframe(options);
}

function share_wechat_timeline(options) {
	add_iframe(options);
}

function share_weibo(options) {
	add_iframe(options);
}

function share_tools(options) {
	add_iframe(options);
}

function post_order(options) {
	add_iframe(options);
}

function open_tae_item_detail(options) {
	add_iframe(options);
}

module.exports = {
	send: function(method, options) {
		submit(method, options);
	},
	post_order: function(options) {
		options = options || {};
		options['code'] = '3001';
		submit(options);
	},
	goback: function(options) {
		console.log('sdk.goback');
		options = options || {};
		options['code'] = '1000';
		submit(options);
	},
	GoYoubiTask: function(options) {
		console.log('sdk.GoYoubiTask');
		options = options || {};
		options['code'] = '1001';
		submit(options);
	},
	GoAddress: function(options) {
		console.log('sdk.GoAddress');
		options = options || {};
		options['code'] = '1002';
		submit(options);
	},
	GoUserInfo: function(options) {
		console.log('sdk.GoUserInfo');
		options = options || {};
		options['code'] = '1003';
		submit(options);
	},
	InvitationOk: function(options) {
		console.log('sdk.InvitationOk');
		options = options || {};
		options['code'] = '1004';
		submit(options);
	},
	GetInvitation: function(options) {
		console.log('sdk.GetInvitation');
		options = options || {};
		options['code'] = '1005';
		submit(options);
	},
	ShareQQZone: function(options) {
		console.log('sdk.ShareQQZone');
		options = options || {};
		options['code'] = '1006';
		submit(options);
	},
	ShareSina: function(options) {
		console.log('sdk.ShareSina');
		options = options || {};
		options['code'] = '1007';
		submit(options);
	},
	EveryDaySign: function(options) {
		console.log('sdk.EveryDaySign');
		options = options || {};
		options['code'] = '1008';
		submit(options);
	},
	Complaint: function(options) {
		console.log('sdk.Complaint');
		options = options || {};
		options['code'] = '1009';
		submit(options);
	},
	Calendar: function(options) {
		console.log('sdk.Calendar');
		options = options || {};
		options['code'] = '1010';
		submit(options);
	},
	BaiBox: function(options) {
		console.log('sdk.BaiBox');
		options = options || {};
		options['code'] = '1011';
		submit(options);
	},
	GoLogin: function(options) {
		console.log('sdk.GoLogin');
		options = options || {};
		options['code'] = '1012';
		submit(options);
	},
	GoTataQuan: function(options) {
		console.log('sdk.GoTataQuan');
		options = options || {};
		options['code'] = '1013';
		submit(options);
	},
	GoComments: function(options) {
		console.log('sdk.GoComments');
		options = options || {};
		options['code'] = '1014';
		submit(options);
	},
	SHareSuccess: function(options) {
		console.log('sdk.SHareSuccess');
		options = options || {};
		options['code'] = '1015';
		submit(options);
	},
	GetInvitation2: function(options) {
		console.log('sdk.GetInvitation2');
		options = options || {};
		options['code'] = '1016';
		submit(options);
	},
	ShareWXTimeLine: function(options) {
		console.log('sdk.ShareWXTimeLine');
		options = options || {};
		options['code'] = '1019';
		submit(options);
	},
	ExchangeSuccess: function(options) {
		console.log('sdk.ExchangeSuccess');
		options = options || {};
		options['code'] = '1020';
		submit(options);
	},
	GoBindAccount: function(options) {
		console.log('sdk.GoBindAccount');
		options = options || {};
		options['code'] = '1021';
		submit(options);
	},
	ShenMiaoShare: function(options) {
		console.log('sdk.ShenMiaoShare');
		options = options || {};
		options['code'] = '1022';
		submit(options);
	},
	GoYoubiExchange: function(options) {
		console.log('sdk.GoYoubiExchange');
		options = options || {};
		options['code'] = '1023';
		submit(options);
	},
	TipToTopic: function(options) {
		console.log('sdk.TipToTopic');
		options = options || {};
		options['code'] = '1050';
		submit(options);
	},
	MiYouQuanHome: function(options) {
		console.log('sdk.MiYouQuanHome');
		options = options || {};
		options['code'] = '2000';
		submit(options);
	},
	ToolShare: function(options) {
		console.log('sdk.ToolShare');
		options = options || {};
		options['code'] = '2001';
		submit(options);
	},
	Theme: function(options) {
		console.log('sdk.Theme');
		options = options || {};
		options['code'] = '2100';
		submit(options);
	},
	GotoActList: function() {},
	GotoActProductList: function() {},
	GotoTaeItemDetail: function(options) {
		console.log('sdk.GotoTaeItemDetail');
		options = options || {};
		options['code'] = '3000';
		if (!options['item_id']) {
			console.log("item_id should not empty");
		}
		submit(options);
	}

};

/*
params
items=itemid,quantity,skuid;itemid,quantity,skuid;
3000.打开TAE商品详情

params
	items=itemid,quantity,skuid;itemid,quantity,skuid;
3001.TAE商品下单

params
	items=itemid,quantity,skuid;itemid,quantity,skuid;
3002.多笔订单下单  参数还是   sku_id,item_id,quantity  但是用逗号分隔
 
///参数使用 id， url
3071.电商首页（无底部TAB,无签到): 名称 今日特卖
3072.电商首页（无底部TAB,有签到): 名称 签到

params actId string

3073.电商专场商品列表页:  专场ID

3074.电商活动列表页:  活动ID

3075.电商分类列表页:  分类ID

3076.电商商品详情页 / 电商穿衣推荐页面 :  URL

3077.电商商品详情页（百川):商品的OPEN_IID(TAE商品混淆ID)
*/
