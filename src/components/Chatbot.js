import React, { useState } from 'react';
import Message from './Message';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input) return;

    const userMessage = {
      text: input,
      sender: 'user',
    };

    setMessages([...messages, userMessage]);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();

    const botMessage = {
      text: data.reply,
      sender: 'bot',
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="chat-window">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chatbot;