const { readFile } = require('fs/promises')
const http = require('http')

// 客户端请求
// 服务端响应
http.createServer(function(req, response) {
  const { url, method, headers } = req

  if(url === '/' && method === 'GET') {
    readFile('index.html').then((res) => {
      try {
        // response.statusCode= 200
        // response.setHeader('Content-Type', 'text/html')
        response.writeHead(200,'okk', {'Content-Type': 'text/pain'})
        response.end(res)
      } catch (err) {
        response.writeHead(500, {'Content-Type': 'text/pain'})
        reponse.end('服务器错误')
        return
      }
    })
  }

}).listen(30000, function() {
  console.log('已监听3000端口')
})
