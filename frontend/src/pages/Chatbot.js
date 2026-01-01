import React, { useState, useRef } from "react";
import "../styles/Chatbot.css";


export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello there! Ready to practice together?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Format reply (bullets, bold, line breaks)
  const formatReply = (text) => {
    return text
      .replace(/\n/g, "<br>")
      .replace(/- /g, "• ")
      .replace(/\\(.?)\\*/g, "<b>$1</b>");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const userMessage = input;
    setInput("");
    setTyping(true);

    try {
      // API call
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      const reply = data.reply || "🤔 Sorry, I couldn't find an answer.";

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: reply, formatted: true },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠ Error: Unable to fetch answer." },
      ]);
    } finally {
      setTyping(false);
      setTimeout(scrollToBottom, 100);
    }
  };

  return (
    <>
      {/* Bot floating button */}
      <div id="chatbot-button" className="bot-wave" onClick={() => setIsOpen(true)}>
        <div className="chatbot-btn-circle">
          <img src="./bot1.png" alt="Cookoo Bot" />
        </div>
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div id="chatbot-panel">
          <div className="chatbot-header">
            <img
              src="Bot1.png"
              alt="Bot"
              className="chatbot-avatar"
            />
            <strong>Edu Bot</strong>
            <span id="close-chatbot" onClick={() => setIsOpen(false)}>
              &times;
            </span>
          </div>

          {/* Messages */}
          <div id="chatbot-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={msg.sender === "user" ? "user-message" : "bot-message"}
                dangerouslySetInnerHTML={
                  msg.formatted
                    ? { __html: formatReply(msg.text) }
                    : { __html: msg.text }
                }
              />
            ))}

            {typing && <div className="bot-message">Typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <input
              type="text"
              id="chatbot-input"
              placeholder="Ask me anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button id="chatbot-send" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}