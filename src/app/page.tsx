"use client";

import ConversationArea from "@/components/ConversationArea";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import _ from "lodash";
import { useChat } from "ai/react";

const Home: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-y-auto">
        <ConversationArea messages={messages} />
      </div>
      <Footer
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
      />
    </div>
  );
};

export default Home;
