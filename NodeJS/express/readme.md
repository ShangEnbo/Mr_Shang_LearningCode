# express

两种常见的服务器
- Web网站服务器
- API接口服务器

## 网络请求 - /express/index.js

 - 引入express
 - 创建express实例
 - get/post请求
 - 动态匹配参数
 - 托管静态资源
 - 接口监听

## 路由 

```
./express

- router.js
- router_modules
-- main.js
```



路由指客户端的请求与服务器处理函数之间的影响关系

Express中由3部分组成，分别是请求的类型、请求的URL、处理函数

`app.METHOD(PATH, HANDLER)`

按定义顺序进行匹配，请求类型和请求URL同时匹配成功，才会调用相应的处理函数

**模块化路由**

将路由抽离为单独模块

app.use() 作用：注册全局中间件

路由也可以添加前缀

1. 创建路由模块对应的js文件
2. 调用express.Router()函数创建路由对象
3. 向路由对象上挂载具体的路由
4. module.exports向外共享路由对象
5. 使用app.use()函数注册路由模块

## 中间件

```
./express

- middleware.js

```

中间件是业务流程的中间处理环节

中间件必须包含next函数

next函数的作用是实现多个中间件连续调用的关键，他表示把流转关系转交给下一个中间件或路由

**全局生效的中间件**

客户端发起的任何请求，到达服务器后，都会触发的中间件，叫全局生效的中间件

通过调用 app.use(),即可定义一个全局生效的中间件

多个中间件之间，共享同一份req和res，基于这样的特性，我们可以在上的中间件中，统一为req或res对象添加自定义的属性或方法，供下游的中间件或路由进行使用

也就是说，我们可以在发送过来的请求上挂载一些属性，这样后面的中间件和响应的回调函数都可以访问到

**定义多个全局中间件**

可以使用app.use()连续定义多个全局中间件，客户端请求到达服务器之后，会按照中间件定义的先后顺序依次进行调用

**局部中间件**

不使用app.use()定义的中间件

使用方法

```
app.get('/', mw, callback)
```

mw这个中间件只在当前路由中生效，这种用法属于局部中间件

**定义多个局部中间件**

```js
app.get('/', mw, mw1, callback)
app.get('/', [mw, mw1], callback)
```

这两种定义方式效果相同

**5个注意事项**

1. 一定要在路由之前注册中间件
2. 客户端发送过来的请求，可以连续调用多个中间件进行处理
3. 执行中间件的业务代码之后，不要忘记调用next()函数
4. 为了防止代码逻辑混乱，调用next函数后不要再写额外的代码
5. 连续调用多个中间件之间，共享req和res对象

**中间件分类**

- 应用级别中间件

app.use()、app.get()、app.post(),绑定到app实例上的中间件

- 路由级别中间件

绑定到express.Router()实例上的中间件，router.use(mw)

- 错误级别中间件

专门用来补货整个项目中发生的一场错误，从而防止项目异常崩溃的问题

格式 `function (err, req, res, next) {}`

```js
app.get('/', function(req, res) {
  throw new Error('服务器内部发生错误')
  res.send('HOME PAGE')
})

app.use(function(err, req, res, next) {
  console.log('发生了错误' + err.message)
  res.send('Error' + err.message)
})
```

错误级的中间件在所有路由后面，用来捕获整个项目的异常项目，防止项目崩溃

- Express内置中间件

 - express.static 快速托管静态资源的内置中间件，例如：HTML，图片，CSS样式等等
 - express.json 解析JSON格式的请求体数据（仅在4.16.0+版本可用）
 > 解析 application/json 格式数据的中间件
 - express.urlencoded 解析URL-encoded格式的请求体数据（仅在4.16.0+版本可用）
 > 解析 application/x-www-form-urlencoded 格式数据的内置中间件
- 第三方中间件
 > 按需下载并配置第三方中间件，从而提高开发效率
 
 > 比如 body-parse

**自定义中间件**





## 写接口

预检请求

1. get、post、head之外的请求Method类型
2. 请求头中包含自定义头部字段
3. 向服务器发送application/json格式的数据

在浏览器与服务器正式通信之前，浏览器会发送OPTIONS请求惊醒预检，以获知服务器是否允许该实际清求，所以这一次OPTIONS请求称为预检请求，服务器成功响应预检请求之后，才会发送真正的请求，并且携带真实数据


JSONP

1. 获取客户端发送过来的回调函数的名字
2. 得到要通过JSONP形式发送给客户端的数据
3. 根据前两步得到的数据，拼接出一个函数调用的字符串
4. 把上一步拼接得到的字符串，响应给客户端的<script>标签进行解析执行