import { useState } from "react"
import { io } from 'socket.io-client'

const App = () => {
  const [datas, setDatas] = useState([])
  const [text, setText] = useState('')

  const sendData = async () => {
    /*const server = new WebSocket('wss://live-server-testt.onrender.com')

    server.addEventListener("open", () => {
      // send a message to the server
      server.send(JSON.stringify({
        type: "hello from client",
        content: text
      }));
    });

    server.addEventListener("message", ({ data }) => {
      //const packet = JSON.parse(data);
      switch (data.type) {
        case "hello from server":
        setDatas(e => [...e, data])
        break;
      }
    });*/

    const socket = io("https://live-server-testt.onrender.com");

    // send a message to the server
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // receive a message from the server
    socket.on("hello from server", (...args) => {
      console.log(args)
    });
  }
  


  return (
    <div className="App">
        <input
        type="text"
        onChange={e => setText(e.target.value)}
        />
        <button onClick={sendData}>Send</button>
        {datas.length && datas.map(data => 
          <div>{data.content}</div>
        )}
    </div>
  )
}

export default App
