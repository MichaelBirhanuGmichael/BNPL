"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, CheckCheck, Paperclip, Send } from "lucide-react";
import { useRouter } from "next/navigation";

type ChatMessage = {
  id: string;
  sender: "agent" | "user";
  text: string;
  time: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "agent",
    text: "Hi, welcome to MEREQ Care. I can help with payments, orders, or credit limit questions.",
    time: "09:41",
  },
  {
    id: "m2",
    sender: "agent",
    text: "Tell me what you need and I will guide you quickly.",
    time: "09:42",
  },
];

const quickReplies = ["Where is my order?", "Payment failed", "Increase BNPL limit", "Report merchant issue"];

export default function CarePage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");

  const getCurrentTime = () =>
    new Date().toLocaleTimeString("en-ET", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  const handleSend = (event: FormEvent) => {
    event.preventDefault();
    const message = draft.trim();
    if (!message) return;

    setMessages((current) => [
      ...current,
      {
        id: `u-${Date.now()}`,
        sender: "user",
        text: message,
        time: getCurrentTime(),
      },
      {
        id: `a-${Date.now() + 1}`,
        sender: "agent",
        text: "Thanks. A MEREQ Care specialist will reply shortly. For urgent issues, include your order ID.",
        time: getCurrentTime(),
      },
    ]);
    setDraft("");
  };

  const sendQuickReply = (text: string) => {
    setDraft(text);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] max-w-[400px] mx-auto flex flex-col">
      <div className="px-5 pt-8 pb-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center">
            M
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">MEREQ Care</h1>
            <p className="text-xs font-medium text-emerald-600">Online now</p>
          </div>
          <span className="text-[11px] font-medium text-gray-400">Secure chat</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="flex justify-center">
          <span className="text-[11px] text-gray-500 bg-white border border-gray-100 rounded-full px-3 py-1 shadow-sm">Today</span>
        </div>

        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[84%] ${message.sender === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                  message.sender === "user"
                    ? "bg-emerald-500 text-white rounded-br-md"
                    : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
                }`}
              >
                {message.text}
              </div>
              <div className={`mt-1 text-[11px] flex items-center gap-1 ${message.sender === "user" ? "text-gray-500" : "text-gray-400"}`}>
                <span>{message.time}</span>
                {message.sender === "user" && <CheckCheck className="w-3.5 h-3.5 text-emerald-500" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickReplies.map((reply) => (
            <button
              key={reply}
              type="button"
              onClick={() => sendQuickReply(reply)}
              className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 hover:bg-emerald-100 transition-colors"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSend} className="px-4 pb-4 pt-2 border-t border-gray-100 bg-white">
        <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2 shadow-sm">
          <button
            type="button"
            className="w-8 h-8 rounded-full text-gray-500 hover:bg-gray-100 flex items-center justify-center transition-colors"
            aria-label="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a message..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors disabled:bg-gray-300"
            aria-label="Send message"
            disabled={!draft.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
