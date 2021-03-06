# React Middleware

## 架构目的
- 开发者不用关心如何在页面上引用资源
- 通过npm进行依赖管理
- 去掉webserver层
- 发布js代码，直接调用pigeon服务，打通各个业务。
- 模块可直接复用

## get start

- 安装依赖

```
npm install
```

- 运行服务器

我使用[forever](https://github.com/foreverjs/forever)做服务器监控

```
npm install forever -g
forever -w server.js
```

- 开启gulp编译

```
gulp
```

- 浏览器打开 [http://localhost:3000/list](http://localhost:3000/list)


## 说明

entry 目录可以理解成页面入口

- action： 是打开这个页面所需要的行为，如果有这个字段的话，会先执行action，然后绘制页面
- async： 默认是false，服务器端填充完数据之后，再把完整的html返回给前端，如果设为true的话，服务器端会吐不含数据的页面，然后通过页面的js代码请求数据。可以通过修改entry/detail的async变量看效果
- component： 页面的view
- title: 页面title



