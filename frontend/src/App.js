import { useState } from "react"
import { io } from 'socket.io-client'

const App = () => {
  const [datas, setDatas] = useState([])
  const [text, setText] = useState('')

  const sendData = async () => {
    /*const socket = new WebSocket("ws://localhost:4000");

    socket.addEventListener("open", () => {
      // send a message to the server
      socket.send(JSON.stringify({
        type: "hello from client",
        content: [ 3, "4" ]
      }));
    });
    
    // receive a message from the server
    socket.addEventListener("message", ({ data }) => {
      const packet = JSON.parse(data);
    
      switch (packet.type) {
        case "hello from server":
          setDatas(e => [...e, packet.content])
          break;
      }
    });*/

    const socket = io(undefined);

    // send a message to the server
    socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

    // receive a message from the server
    socket.on("hello from server", (args) => {
      console.log(args)
      setDatas(e => [...e, args])
    });
    console.log(0)
  }
  


  return (
    <div className="App">
        <input
        type="text"
        onChange={e => setText(e.target.value)}
        />
        <button onClick={sendData}>Send</button>
        {datas.length && datas.map(data => 
          <div>{data}</div>
        )}
    </div>
  )
}

export default App
