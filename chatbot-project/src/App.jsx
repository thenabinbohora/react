import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import { ChatInput } from "./components/ChatInput";
import { ChatMessages } from "./components/ChatMessages";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
  useEffect(() => {
    Chatbot.addResponses(
      {
        "hi":"I am ChatBot, your virtual assistant."
      }
    );
  }, []);

  useEffect(()=> {
    localStorage.setItem('messages', JSON.stringify(chatMessages))
  }, [chatMessages]);
  //const [chatMessages, setChatMessages] = array;
  // const chatMessages = array[0];
  // const setChatMessages = array[1];
  return (
    <div className="app-container">
      {chatMessages.length === 0 && (
        <p>
          {" "}
          Welcome to the chatbot project! Send a message using the textbox
          below.
        </p>
      )}
      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default App;
