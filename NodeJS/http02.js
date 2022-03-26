const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
  const { method, url } = req
  // 支持的源
  res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.2:8080')
  // 支持的头
  res.setHeader('Access-Control-Allow-Headers', 'X-Token,Content-Type')
  // 支持的方法
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // 携带Cookie true 允许 false 不允许
  // 如果允许跨域不可以设置 *
  res.setHeader('Access-Control-Allow-Credentials', 'true')

  if(method === 'OPTIONS') {
    res.end()
  }

  if(method === 'GET' && url === '/') {
    fs.readFile('./index.html', (err, data) => {
      if(err) {
        res.writeHead(500, {'Content-Type': 'text/plain;charset=utf-8'})
        res.end('服务器错误')
        return
      }
      res.setHeader('Content-Type', 'text/html')

      res.end(data)
    })
  }

  if((method === 'GET' || method === 'POST') && url === '/users') {  
    res.statusCode =200
    res.setHeader('Content-Type', 'text/html')
    res.setHeader('Set-Cookie', 'cookie1=aaaa')
    res.end(JSON.stringify({name: 'laney'}))
  }

  if(method === 'GET' && url === '/list') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(JSON.stringify({name: 'ss'}))
  }
}).listen(30000, () => {
  console.log('已监听30000端口')
})