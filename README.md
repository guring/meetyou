公共资源模块
============

# [js桥说明文档](http://git.meiyou.im/iOS/iOS/wikis/URI)

# [七牛图片裁剪说明](http://developer.qiniu.com/code/v6/api/kodo-api/image/imageview2.html)

# [旧版协议说明](http://gitlab.meiyou.com/h5/meetyou/blob/master/docs/oldbridge.md)


公共模块在不同的项目里面会重复用到，用 Gitlab 统一维护管理，而不是在项目需要的时候从别的地方 copy 一份代码到当前的项目中。

## 包含模块
- jssdk
- common
- packages
- bridge
- base64
- JSON
- location
- query


如果项目中需要依赖上面模块中的一个或多个，就有必要使用公共模块。

## 如何使用

```
npm install -S git+ssh://git@gitlab.meiyou.com:h5/meetyou.git
```

上面的操作会将公共模块引入到需要的项目中，包路径在项目目录下 node_modules/meetyou，并且将依赖信息记录到 package.json。

window下必须使用 git shell 才能正确安装，自带的cmd命令默认不支持git和ssh命令，如有需要可自己拓展安装别的命令行工具

安装过程如果出错，请再次尝试安装；

如果还不能正确安装，请删除源项目下的package.json内的依赖meetyou字段后再尝试

## API

```
var meetyou = require('meetyou');
```

#### meetyou.jssdk

- `jssdk.sdk` sdk 模块，请求约定的协议
- `jssdk.bridge` bridge 模块
- `jssdk.action` 事件操作模块，比如 `goback`, `mobclick`

#### meetyou.common

- `common.tools` 常用工具模块，比如 parse querystring params
- `common.client` 客户端检测，比如平台，UA

```
var common = meetyou.common;
var _ = common.tools;

_.queryParams('channelID')
// AppStore
```

公共模块可能包含公共的 js/css/images。

#### meetyou.packages
- `packages.meiyou`
- `packages.yunqi`
- `packages.youzijie`

```
var pkgs = meetyou.packages;

pkgs.meiyou // 美柚 App
pkgs.meiyou.android // 美柚 App Android 客户端
pkgs.yunqi.ios // 孕期 App iOS 客户端
```

#### meetyou.bridge

bridge的wait方法是一个类似于ajax的方法，它的执行过程是异步的

{ 注意 } 此模块不同于meetyou.jsbridge

meetyou.jsbridge 包含 base64，json模块

meetyou.bridge 引用base64, json；

- ```bridge.wait``` 等待回调方法
- ```bridge.listen``` 注册监听事件
- ```bridge.invoke``` 直接调用方法

```
var bridge = require('meetyou/bridge');
bridge.wait('share/do', {}, function(url, data){

});

```

#### meetyou.base64
```
var base64 = require('meetyou/base64');
base64.encoder('whatever');

```


#### meetyou.json

此模块为polyfill，现大部分浏览器都支持，

```
var json = require('meetyou/json');
json.parse('{}');

```

#### meetyou.location

此模块会重写 ```window.location``` 的属性，

添加 ```window.location.query``` 属性，
解释```window.location.search``` 成 ```object```


```
var location = require('meetyou/location');
```

#### meetyou.query

此模块用于 类似 window.location.search 参数的解析

```
var query = require('meetyou/query');
var params = query.parse('?a=b&c=d');
var string = query.stringify(params);
```
