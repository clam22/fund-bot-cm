import { Message } from "ai";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";

interface ConversationAreaProps {
  messages: Message[];
}

const suggestions = [
  "What are Satrix's top-performing ETFs?",
  "How do I start investing with Satrix?",
  "Explain Satrix's fee structure",
  "Compare Satrix to other investment platforms",
  "What's the minimum investment amount for Satrix funds?",
  "How to diversify my portfolio using Satrix products?",
];

const ConversationArea: React.FC<ConversationAreaProps> = ({ messages }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-5 p-4" ref={containerRef}>
      <div className={`${messages.length === 0? "block" : "hidden"} text-7xl flex justify-center p-8 mb-24`}>
        FIND YOUR FUND
      </div>
      <div className={`${messages.length === 0? "block" : "hidden"} flex flex-wrap gap-2 p-4 justify-center`}>
        {suggestions.map((suggestion, index) => (
          <button
            className="border p-5 rounded-full w-2/5 border-zinc-500 text-zinc-500"
            key={index}
          >
            {suggestion}
          </button>
        ))}
      </div>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className={`${
            message.role === "assistant" ? "justify-start" : "justify-end"
          } flex w-full`}
        >
          <div
            className={`${
              message.role === "assistant"
                ? "w-5/6 bg-zinc-900"
                : "w-2/6 bg-slate-900"
            } rounded-md py-3 px-5`}
          >
            <Markdown>{message.content}</Markdown>
            {/* <h1>{message.content}</h1> */}
            <small className="text-gray-600">
              {message.createdAt?.toLocaleTimeString()}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationArea;
