公共资源模块
============

公共模块在不同的项目里面会重复用到，用 Gitlab 统一维护管理，而不是在项目需要的时候从别的地方 copy 一份代码到当前的项目中。

## 包含模块
- jssdk
- common
- packages

如果项目中需要依赖上面模块中的一个或多个，就有必要使用公共模块。

## 如何使用

```
npm install -S git+ssh://git@gitlab.meiyou.com:h5/meetyou.git
```
上面的操作会将公共模块引入到需要的项目中，包路径在项目目录下 node_modules/meetyou，并且将依赖信息记录到 package.json。

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