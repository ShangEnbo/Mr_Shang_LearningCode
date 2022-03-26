const fs = require('fs')
const http = require('http')

http.createServer((req, res) => {
  const { url, method } = req
  // res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.2:8080')

  // res.setHeader('Access-Control-Allow-Origin')
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, OPTIONS, HEAD')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'X-token,Content-Type')
 
  if(method == 'OPTIONS') {
    res.end()
  }

  if(method == 'GET' && url == '/') {
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

  if((method == 'GET' || method == 'POST') && url == '/users') {
    res.setHeader('Set-Cookie', 'cookie1=123123')
    res.setHeader('Access-Control-Allow-Origin', 'http://172.20.10.2:8080')
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html')
    res.end(JSON.stringify({name: '123213'}))
  }

}).listen(30002, () => {
  console.log('已监听30002')
})