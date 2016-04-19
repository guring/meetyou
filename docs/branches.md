gitlab分支说明
============

- `master` 线上环境代码 (\*.\*.com)

- `release` 局域网环境代码 (local.\* .\* .com)

- `simulation` 模拟线上环境代码 (test.\* .\* .com)

- `develop` 开发环境代码 (pc.\*.\*.com)

#### 适用项目：
[公共项目](http://gitlab.meiyou.com/h5/meetyou.git)
[美柚官网](http://gitlab.meiyou.com/h5/nodejs-meiyou.git)
[育儿官网](http://gitlab.meiyou.com/h5/yuer.git)
[孕期官网](http://gitlab.meiyou.com/h5/yunqi.git)
[小工具](http://gitlab.meiyou.com/h5/tools.git)
[api文档](http://gitlab.meiyou.com/research/doc.git)

### 开发规范说明：
1:从develop上创建个人分支，分支必须带前缀：

  - ` hotfix- `:线上bug修复

  - ` feature- `:功能分支

2:开发完成后发出合并到develop的请求；

3:develop请求通过后，发起合并release的请求；

4:release发起合并master请求

5:3-4步骤可以由code－viewer发起，在2步骤中注明下，通过则合并到release


## 默认项目文件结构说明

- `dist` 生产环境代码 ：代码规范默认忽略目录）

- `src`  开发环境源码 ：严格检测代码规范）


## 默认npm命令说明：

- `npm install`   : 初次pull代码后需要执行

- `npm run build` : 构建上线代码

- `npm run start` : 预览线上环境

- `npm run watch` : 本地开发环境热加载
