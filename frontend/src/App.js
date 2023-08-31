import { useState } from "react"


const App = () => {
  const [datas, setDatas] = useState([])
  const [text, setText] = useState('')

  const sendData = async () => {
    const server = new WebSocket('wss://live-server-testt.onrender.com')

    server.addEventListener("open", () => {
      // send a message to the server
      server.send(JSON.stringify({
        type: "hello from client",
        content: text
      }));
    });

    server.addEventListener("message", ({ data }) => {
      const packet = JSON.parse(data);
    
      switch (packet.type) {
        case "hello from server":
        setDatas(e => [...e, packet])
        break;
      }
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
