const Websocket = require('ws').Server

let ws = new Websocket({port: 8181})

// eventEmitter 事件触发器
// 先连接
ws.on('connection', (ws) => {
  // message监听客户端发来的消息
  ws.on('message', (data) => {
    console.log(data);
    // 给客户端发送消息
    ws.send(`你好${data}呀！`)
  })
  ws.on('close', (message) => {
    console.log('已关闭连接')
  })
})