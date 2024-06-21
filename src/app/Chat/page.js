'use client';

import React, { useEffect, useState } from "react";
import io from "socket.io-client";


const socket = io("http://ec2-3-79-99-12.eu-central-1.compute.amazonaws.com:80",
  
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

