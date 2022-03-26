// const express = require('express')
const http = require('http')
const url = require('url')

// 自我封装express
let routers = []
class Application {
  get(path, handler) {
    routers.push({ 
      path,
      method: 'GET',
      handler
    })
  }
  listen() {
    const server = http.createServer(function(request, response) {
      const pathname = request.url
      const method = request.method
      // 发送一次请求就会调用一次
      let obj = routers.find(v => v.path == pathname && v.method == method)      
      if(obj) obj.handler(request, response)
      else console.log(`未发现资源:${pathname}`) 
    })
    server.listen(...arguments)
  }
}

// module.exports = function() {
//   return new Application()
// }

const app = new Application()
app.get('/', (req, res) => {
  res.end('Hello World')
})
app.listen(3400, () => {
  console.log('一监听3400');
})