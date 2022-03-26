const net =require('net')


let server = net.createServer(function(client) {
  client.write('Hello World')
}).listen(9001)

console.log('启动成功');