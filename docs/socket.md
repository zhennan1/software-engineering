# WebSocket

基于Node.js、Express和Socket.IO的简单WebSocket聊天应用的demo实现

### 代码的组成部分和工作流程

1. 设置服务器
使用Express创建一个web服务器，然后通过http模块将其封装以支持HTTP和WebSocket通信。
socketIo(server)初始化了一个新的Socket.IO实例，绑定到之前创建的HTTP服务器上，这允许你在同一个端口上接收WebSocket连接。
2. 客户端连接
当客户端通过/路由访问服务器时，服务器通过res.sendFile(__dirname + '/index.html');向客户端发送一个HTML文件。这个HTML文件应该包含用于与服务器建立WebSocket连接的客户端Socket.IO逻辑。
io.on('connection', (socket) => {...})监听新的WebSocket连接。每当新用户连接到WebSocket服务器时，这个回调函数就会被执行。
3. 实时通信
在connection事件的回调中，使用socket.on('chat message', (msg) => {...})监听来自客户端的消息。每当客户端通过WebSocket发送消息时，服务器就会接收到这些消息。
使用io.emit('chat message', msg);将接收到的消息广播回所有连接的客户端。这样，任何发送到服务器的消息都会被立即分发给所有监听该消息类型的客户端。
4. 断开连接
socket.on('disconnect', () => {...})监听断开连接事件。当用户关闭网页或断开连接时，服务器会打印一条消息到控制台。
5. 服务器监听
最后，服务器通过server.listen(PORT, () => {...})在指定的端口上开始监听连接请求。

./server.js
```js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 配套文件

./index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat App</title>
  <style>
  </style>
</head>
<body>
  <ul id="messages"></ul>
  <form id="form" action="">
    <input id="input" autocomplete="off" /><button>Send</button>
  </form>

  <script src="/socket.io/socket.io.js"></script>
  <script>
    var socket = io();
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (input.value) {
        socket.emit('chat message', input.value);
        input.value = '';
      }
    });

    socket.on('chat message', function(msg) {
      var item = document.createElement('li');
      item.textContent = msg;
      document.getElementById('messages').appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });
  </script>
</body>
</html>
```

### 运行

确保已经安装了Node.js
在项目文件夹中运行npm init -y来初始化一个新的Node.js项目。这将创建一个package.json文件
安装express和socket.io库。运行命令npm install express socket.io
在命令行中运行node server.js启动服务器
打开浏览器并访问http://localhost:3000
可以在不同的浏览器标签页中打开相同的URL来模拟多个用户参与聊天