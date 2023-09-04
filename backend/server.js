require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const {WebSocketServer} = require('ws')
const cors = require('cors')

const app = express()

app.use(cors({
    origin: 'https://live-server-testing.netlify.app'
}))

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


/*const server = new WebSocketServer({ port: 4000 });

server.on("connection", (socket) => {

  // receive a message from the client
  socket.on("message", (data) => {
    const packet = JSON.parse(data);

    switch (packet.type) {
      case "hello from client":
        console.log(packet)
        send()
        break;
    }
  });

  const send = () => {
    // send a message to the client
  socket.send(JSON.stringify({
    type: "hello from server",
    content: [ 1, "2" ]
  }));
}
});*/

const {createServer} = require('http')
const httpServer = createServer(app)
const io = require('socket.io')(httpServer);

io.on("connection", (socket) => {
  // send a message to the client
  //socket.emit("hello from server", "kkk", "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    console.log(args)
    io.emit('hello from server', 'okkkk')
  });
});