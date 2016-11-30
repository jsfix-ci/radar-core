---
title: koa2 mvc scaffold
date: 2016-09-22 23:43:39
tags: readme
---

>人们总是对热门的开源作品抱有很大的宽容，react-router每次大更新都废弃很多API，虽然总的来说是在做减法，而koa2相对于koa1确是个非常非常重大的改变，都不能愉快的使用yield了，为了async做了太多的妥协，兼容性都抛一边了...

koa2最主要的改变是默认的中间件变成的返回Promise，但是不管怎样，向未来看齐，所以我开始基于koa2写了一个MVC库`radar-core`

### 安装

开发环境是在v6.3.1下，以及建议用npm安装而不是cnpm，cnpm安装完后会少安一些包，导致启动报错

```
npm install radar-core --save
```

例子:

```javascript
// app.js radar作为全局变量挂载在global下面
var app = require('radar-core')
app.start(function (err) {
  if (err) return console.log(err)
  console.log('start on port', radar.config.port, new Date())
})

```

启动:
```
node app.js
```

此时访问`localhost:2333`能看到网页的一行字`welcome radar-core`既表示启动成功

PS:

启动的时候，radar-core会自动创建必须的文件夹，这些文件夹的功能如下:

- `config`  填写配置文件的地方
- `controllers` 填写控制器的地方
- `filter`  过滤器
- `middlewares`  全局中间件，可选之前触发或者之后触发
-  `routers`  路由配置文件


### 更多例子

to be continue....
