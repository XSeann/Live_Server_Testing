require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const WebSocket = require('ws')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json({limit: '50mb'}))
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('PORT: ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


/*const wss = new WebSocket.Server({ port: 443 });

wss.on("connection", (ws) => {
    // receive a message from the client
    ws.on("message", (data) => {
        const packet = JSON.parse(data);
    
        switch (packet.type) {
            case "hello from client":
            //sendMessage(packet)
            break;
        }
    });

    // send a message to the client
    ws.send(JSON.stringify({
        type: "hello from server",
        content: "Hi!"
    }));

});*/

const {createServer} = require('http')
const {Server} = require('socket.io')

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000"
    }
  });

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    console.log(args)
  });
});