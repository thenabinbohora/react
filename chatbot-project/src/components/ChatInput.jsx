import { useState } from "react";
import { Chatbot } from "supersimpledev";
import './ChatInput.css';
import LoadingStateImage from "../assets/loading-spinner.gif";

export function ChatInput({ chatMessages, setChatMessages, isLoading, setIsLoading }) {
  const [inputText, setInputText] = useState("");

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
    if (event.key === "Escape") {
      setInputText("");
    }
  }

  async function sendMessage() {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return;
    const newChatMessages = [
      ...chatMessages,
      {
        message: trimmedInput,
        sender: "user",
        id: crypto.randomUUID(),
      },
    ];

    setChatMessages(newChatMessages);
    setInputText("");
    setIsLoading(true);
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingStateImage} className="loading-img" />,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    const response = await Chatbot.getResponseAsync(trimmedInput);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: "robot",
        id: crypto.randomUUID(),
      },
    ]);
    setIsLoading(false);
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to ChatBot"
        size="30"
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={() => {
          if (!isLoading && inputText.trim()) {
            sendMessage();
          }
        }}
        className="send-button"
      >
        Send
      </button>
    </div>
  );
}