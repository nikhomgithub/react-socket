const http = require('http');

const express = require('express');
const app = express();
const server = http.createServer(app);

const socketio = require('socket.io');
const io = socketio(server);  //2

app.get('/',()=>{
    res.send("<h1>Hello World<h1>")
});

io.on('connection', (socket) => {  
    console.log('socket connected');
    socket.on('chat message',(msg)=>{
        console.log(`msg: `+ JSON.stringify(msg))
        io.emit('chat message',msg)
    })
})
server.listen(3001, '0.0.0.0', (err) => {
    console.log('listening on : 3001');
});

