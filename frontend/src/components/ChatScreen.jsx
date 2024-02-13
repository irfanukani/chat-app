import React, { useEffect, useState } from "react";
import socket from "../config/socket";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    socket.emit("join-room");

    socket.on("chat", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("room-users", (numberOfActiveUsers) => {
      setActiveUsers(numberOfActiveUsers);
    });

    return () => {
      socket.off("guest-joined");
      socket.off("chat");
    };
  }, []);

  const handleSubmit = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { type: "chat", text: inputMessage }]);
      socket.emit("chat", { text: inputMessage });
      setInputMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <section className="w-full h-screen bg-gray-800 grid place-items-center">
      <div className="fixed top-2 right-2 flex items-center gap-2 text-white">
        <div className="rounded-full p-1 bg-green-400"></div> {activeUsers}{" "}
        Active users
      </div>
      <div className="flex flex-col overflow-y-scroll h-4/5 mt-8 md:mt-1">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 w-80 self-start`}>
            <div className={`px-4 py-2 rounded-lg bg-blue-500 text-white`}>
              <p>
                <span className="text-sm">Guest :</span> {message.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 fixed bottom-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className="px-2 py-1 border rounded mr-2 w-60"
          placeholder="Type your message..."
          onKeyPress={handleKeyPress}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition"
        >
          Send
        </button>
      </div>
    </section>
  );
}
