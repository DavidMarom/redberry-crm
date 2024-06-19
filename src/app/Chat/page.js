'use client';

import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:3001",
// const socket = io("ec2-18-153-81-26.eu-central-1.compute.amazonaws.com:80",
const socket = io("ec2-3-72-14-4.eu-central-1.compute.amazonaws.com:80",


  {
    timeout: 5000,
    transports: ["websocket", "polling", "flashsocket", "htmlfile", "xhr-polling", "jsonp-polling"],
  }
);

const Home = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => { console.log("Socket connected") });
    socket.on("message", (msg) => { setMessages((prevMessages) => [...prevMessages, msg]) });
    // return () => { socket.disconnect() };
  }, []);

  const sendMessage = () => { socket.emit("message", message); setMessage(""); };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <br />
      <p>Messages:</p>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

