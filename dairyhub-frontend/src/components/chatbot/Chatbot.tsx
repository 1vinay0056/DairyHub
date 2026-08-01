import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
} from "lucide-react";

import {
  botReplies,
  defaultReply,
} from "./botReplies";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function ChatBot() {

  const [open, setOpen] =
    useState(false);

  const [input, setInput] =
    useState("");

  const [messages, setMessages] =
    useState<Message[]>([
      {
        sender: "bot",
        text:
          "👋 Hello!\n\nWelcome to DairyHub.\nHow can I help you today?",
      },
    ]);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  const sendMessage = () => {

    if (input.trim() === "")
      return;

    const userText =
      input.trim();

    setMessages((prev) => [

      ...prev,

      {
        sender: "user",
        text: userText,
      },

    ]);

    setInput("");

    let reply =
      defaultReply;

    const lower =
      userText.toLowerCase();

    for (const item of botReplies) {

      if (

        item.keywords.some((k) =>
          lower.includes(k)
        )

      ) {

        reply =
          item.reply;

        break;

      }

    }

    setTimeout(() => {

      setMessages((prev) => [

        ...prev,

        {
          sender: "bot",
          text: reply,
        },

      ]);

    }, 500);

  };

  const quickQuestions = [

    "Milk",

    "Paneer",

    "Subscription",

    "Order",

    "Delivery",

    "Contact",

  ];

  return (<>
  {/* Floating Button */}

  <button
    onClick={() => setOpen(!open)}
    className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-green-700"
  >
    {open ? (
      <X size={28} />
    ) : (
      <MessageCircle size={30} />
    )}
  </button>

  {/* Chat Window */}

  {open && (

    <div className="fixed bottom-24 right-6 z-50 flex h-[560px] w-[370px] flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">

      {/* Header */}

      <div className="flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-4 text-white">

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-green-600">

          <Bot size={24} />

        </div>

        <div>

          <h2 className="font-bold text-lg">

            DairyHub Assistant

          </h2>

          <p className="text-xs opacity-90">

            🟢 Online

          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">

        {messages.map((msg, index) => (

          <div
            key={index}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line shadow-sm ${
              msg.sender === "user"
                ? "ml-auto bg-green-600 text-white"
                : "bg-white text-slate-700"
            }`}
          >

            {msg.text}

          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      {/* Quick Questions */}

      <div className="border-t bg-white px-4 py-3">

        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">

          Quick Questions

        </p>

        <div className="flex flex-wrap gap-2">

          {quickQuestions.map((item) => (

            <button
              key={item}
              onClick={() => setInput(item)}
              className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 transition hover:bg-green-600 hover:text-white"
            >

              {item}

            </button>

          ))}

        </div>

      </div>
            {/* Input */}

      <div className="flex items-center gap-2 border-t bg-white p-4">

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask me anything..."
          className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />

        <button
          onClick={sendMessage}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700"
        >
          <Send size={18} />
        </button>

      </div>

    </div>

  )}

</>

);

}