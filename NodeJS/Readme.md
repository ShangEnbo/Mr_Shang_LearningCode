# node js特性：

- 单线程
- 异步，I/O
- 事件与回调函数，事件驱动


模块引用的两种写法

- require module.export （CommonJS）
- import export default （ES6）


## os 操作系统

--- os.js ---

- freemem 空闲内存（返回字节）
- totalmem 总内存（返回字节）
- type 操作系统类型 

## fs 文件系统

--- fs.js ---

- readFile 文件读取
  - readFileSync 同步读取
  - readFile(path, callbackFn) 异步读取
- promisify 函数异步化
```js
function promisify(fn) {
  return function() {
    let args = Array.prototype.slice.call(arguments)
    return new Promise((resolve, reject) => {
      arg.push((err, result) => {
        if(err) reject(err)
        else resolve(result)
      })
      fn.apply(null, args)
    })
  }
}

var readFile = promisify(fs.readFile) // 返回一个函数
// readFile('./package.json') 返回一个Promise对象
// 调用Promise.then进行处理
readFile('./package.json').then((res)=> {
  console.log(res.toString());
})
```

## http

--- http.js ---

- http.createServer 

    创建一个httpServer，返回一个http.Server实例

- server.listen() 

  启动 HTTP 服务器监听连接

- reponse.setHeader
- reponse.writehead
- reponse.statusCode
- reponse.end



## nodemon

监听代码文件的变动，当代码改变之后，自动更新

**安装方法**

```
npm install -g nodemon 或 yarn global add nodemon
```

# url解析

```js
const url = require('url')
```

他可以对url进行解析，比如hostname host port pathname等等


# buffer

--- buffer.js ---

- Buffer.alloc(n)
- Buffer.from()
- Buffer.concat()
- Buffer.prototype.write()

# express

--- express.js ---

- 自我封装express

# http协议

--- http02.js ---


1. 请求头

- User-Agent

通过此字段判断用户使用什么设备访问的页面，我们可以根据这个字段值来返回不同端的页面


2. 简单请求

- get/post/head 没有自定义请求头
- Content-Type
  - application/x-www-form-urlencoded
  - multipart/form
  - text/plian

3. 跨域 'Access-Control-Allow-Origin' 

通过添加下面响应头解决

`res.serHeader('Access-Control-Allow-Origin', 'http://localhost:30000')`

4. cookie 'Access-Control-Allow-Credentials'

`res.setHeader('Access-Control-Allow-Credentials', 'true')`

- 携带Cookie true 允许 false 不允许
- 如果服务器需要浏览器发送Cookie， Access-Control-Allow-Origin 不能设置为 *
- 必须指定明确的、与请求网页一致的域名，同时，Cookie 依然遵循同源策略
- 只有用服务器域名设置的 Cookie 才会上传，其他域名的 Cookie 并不会上传
- 且（跨域）原网页代码中的 document.cookie 也无法读取服务器域名下的 cookie

响应端设置cookie - Set-Cookie

`res.setHeader('Set-Cookie', 'cookie1=sda;SameSite=None; Secure=true')`

- 如果设置了 SameSite=None; Secure=true，只能使用https访问
- 谷歌浏览器里面 chrome://flags/ 把SameSite by default cookies、Cookies without SameSite must be secure参数设置成disabled
- 在顶级域名中写入cookie，在子域名中便可以随取随用。

[解决cookie丢失问题](https://www.cnblogs.com/sonechao/p/14817851.html')

5. 方法支持 Access-Control-Allow-Methods

`res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')`

6. 头部字段支持 Access-Control-Allow-Headers

`res.setHeader('Access-Control-Allow-Headers', 'X-token,Content-Type')`

[http和https的 11 个区别](ihuandu.com/help/zsk/46.html)


# net

--- net.js ---

```js
const net =require('net')
```

创建一个TCP服务端

```js
let server = net.createServer(function(client) {
  client.write('Hello World')
}).listen(9001)
```

telnet localhost port 连接

# https

--- ssl.js ---

创建SSL证书

`openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

# websocket 通信协议

ie9以下不能使用

需要安装依赖包`yarn add ws`

应用情景：即时通讯

长连接， C/S模式的实时通信 


前后端都要配置的websocket才能使用

事件触发器
- on 服务端
- open 客户端
- message
- Error
- close
- send

长轮询（持久连接）

- 在TCP连接上可以发送多个数据报，如果没有数据包发送时，依靠发送心跳包来维持连接
- 建立连接 - 数据传输 - （发送心跳包，维持连接） - 数据传输 - 关闭连接
- 服务端响应之后发送第二 个请求

短轮询

- 服务端不会立即响应，如果客户端等待了一段时间还没有收到服务端响应会再发送请求

全双工、半双工、单工

- 全双工

A -> B  A <- B 同一时刻，可以发送和接收数据

和管线化（pipelining）相似，管线化是在建立TCP连接之后，可以同时进行HTTP请求和响应，不需要等待上一个请求响应之后再发送下一个请求

- 单工

方向单一 : 发送 -> 接收

- 半双工

A -> B  A <- B 同一时刻，只能向一个方向


# socket.io

## API
- on()    用于绑定事件
- emit()  用于绑定发送事件
- httpServer(http.Server)   // 需要绑定的服务

## 服务器系统事件
- socket.io.on('connection', callback)    有新的socket连接建立时
- socket.io.on('message', callback)       当有socket.send()方法发送完信息后触发
- socket.io.on('disconnect', callback)    当连接断开时触发

## 客户端系统事件
- socket.io.on('open', callback)              当socket客户端开启与服务器的新连接时触发
- socket.io.on('connect', callback)           当socket客户端连接到服务器后触发
- socket.io.on('connect_timeout', callback)   当socket客户端与服务器连接超时后触发
- socket.io.on('connect_error', callback)     当socket客户端连接服务器失败时触发
- socket.io.on('connect_attempt', callback)   当socket客户端尝试重新连接服务器时触发
- socket.io.on('reconnect', callback)         当socket客户端重新连接时触发
- socket.io.on('reconnect_error', callback)   当socket客户端重新连接服务器失败后触发
- socket.io.on('reconnect_fail', callback)    当socket客户端重新连接服务器失败后触发
- socket.io.on('close', callback)             当socket客户端关闭与服务器连接后触发

# class 中间件

# express


---

# 路径前往
cd desktop/project/front-end/nodejs 