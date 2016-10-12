/**
 * Created by mansikhemka on 12/10/16.
 */


const express = require('express');
const app=express();

const http = require('http');
const server = http.Server(app);

const socket = require('socket.io');
const io = socket(server);
const db = require('./db');

app.use('/', express.static(__dirname + '/public'));

let chatroom={};

io.on('connection', (socket)=>{

    socket.on('userhere', (name)=>{
        chatroom[name] = {
            username: name,
            id: socket.id,
            socket: socket
        };
        chatroom[socket.id]=name;
        socket.broadcast.emit('join', chatroom[socket.id]);
    });

    socket.on('chat',(mssg)=>{
        io.emit('chat', chatroom[socket.id]+" : "+mssg);
        db.save(chatroom[socket.id],mssg,(data)=>{
            console.log(data);
        })
    });
    // socket.on('disconnect',(socket)=>{
    //     socket.broadcast.emit('leaving', chatroom[socket.id].username);
    //     delete chatroom[socket.id];
    // })
})


app.get('/shows',(req,res)=>{
    db.show((data)=>{
        res.send(data);
        console.log(data);
    })
})


server.listen(3000,()=>{
    console.log('http://localhost:3000/');
})