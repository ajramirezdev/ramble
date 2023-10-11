import React from "react";
import { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessages([...messages, input]);
    setInput("");
  };

  return (
    
    <div
      className="flex flex-col ml-3"
      style={{ width: "75rem", height: "45rem" }}
    >
    <ScrollableFeed>
      <div className="flex-grow p-6 bg-gray-100 rounded-lg shadow-lg">
        <ul className="space-y-2">
          {messages.map((message, index) => (
            <li key={index} className="bg-white p-2 rounded-lg shadow">
              {message}
            </li>
          ))}
        </ul>
      </div>
       </ScrollableFeed>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex space-x-2 p-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 rounded-lg border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
          >
            Send
          </button>
        </div>
      </form>
     
    </div>
    
  );
};

export default ChatComponent;
