"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Message {
  id: number;
  text: string;
  sender: "user" | "agent";
  time: string;
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "My item arrived damaged.",
      sender: "user",
      time: "10:32 AM",
    },
    {
      id: 2,
      text: "I'm sorry to hear that! I have frozen your installments while we investigate. Could you please share a photo of the damage?",
      sender: "agent",
      time: "10:33 AM",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const installments = [
    { amount: 4000, date: "Apr 1", status: "paid" },
    { amount: 4000, date: "May 1", status: "pending" },
    { amount: 4000, date: "Jun 1", status: "pending" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      setIsTyping(false);
      const agentMsg: Message = {
        id: messages.length + 2,
        text: "Thank you for your patience. A replacement is being arranged and will ship within 24 hours. Your next payment is on hold until you confirm receipt.",
        sender: "agent",
        time: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      };
      setMessages((prev) => [...prev, agentMsg]);
    }, 2000);
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F5F5F5", maxWidth: "400px", margin: "0 auto" }}
    >
      {/* Header with Product */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ backgroundColor: "#1A1A1A" }}
        className="relative pt-12 pb-6 px-5"
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Order Number */}
        <p
          className="text-center text-sm font-medium mb-4"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Order #MRQ-284
        </p>

        {/* Product Display */}
        <div className="flex items-center gap-4">
          {/* Product Image */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#8B4513" }}
          >
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3L4 7V17L12 21L20 17V7L12 3Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 12L4 8M12 12V21M12 12L20 8"
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="8" r="2" fill="white" />
            </svg>
          </div>

          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">Premium Leather Jacket</h2>
            <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm">
              Size: M | Color: Brown
            </p>
            <p className="font-bold text-lg mt-1" style={{ color: "#00D084" }}>
              12,000 ETB
            </p>
          </div>
        </div>
      </motion.div>

      {/* Installments Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mx-4 -mt-2 rounded-2xl p-5"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        <h3 className="font-bold text-base mb-4" style={{ color: "#1A1A1A" }}>
          Payment Schedule
        </h3>

        <div className="relative">
          {/* Timeline Line */}
          <div
            className="absolute left-[11px] top-6 bottom-6 w-0.5"
            style={{ backgroundColor: "#E5E5E5" }}
          />

          {/* Installment Items */}
          {installments.map((installment, index) => (
            <div key={index} className="flex items-start gap-4 relative mb-5 last:mb-0">
              {/* Node */}
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  backgroundColor: installment.status === "paid" ? "#00D084" : "#E5E5E5",
                }}
              >
                {installment.status === "paid" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12L10 17L19 8"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex items-center justify-between">
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{
                      color: installment.status === "paid" ? "#00D084" : "#1A1A1A",
                    }}
                  >
                    {installment.status === "paid" ? "Paid" : `Due ${installment.date}`}
                  </p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Installment {index + 1} of 3
                  </p>
                </div>
                <p
                  className="font-bold"
                  style={{
                    color: installment.status === "paid" ? "#00D084" : "#1A1A1A",
                  }}
                >
                  {installment.amount.toLocaleString()} ETB
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Installments Frozen Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-4 p-3 rounded-xl flex items-center gap-3"
          style={{ backgroundColor: "#FEF3C7" }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#F59E0B" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 9V13M12 17H12.01M12 3L3 20H21L12 3Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "#92400E" }}>
              Payments Frozen
            </p>
            <p className="text-xs" style={{ color: "#B45309" }}>
              Investigation in progress
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* MEREQ Care Chat Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex-1 mx-4 mt-4 mb-20 rounded-2xl flex flex-col overflow-hidden"
        style={{ backgroundColor: "#FFFFFF", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
      >
        {/* Chat Header */}
        <div
          className="p-4 flex items-center gap-3 border-b"
          style={{ borderColor: "#F5F5F5" }}
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "#00D084" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21 11.5C21 16.75 16.75 21 11.5 21C9.8 21 8.2 20.5 6.8 19.7L3 21L4.3 17.2C3.5 15.8 3 14.2 3 12.5C3 7.25 7.25 3 12.5 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="18" cy="6" r="3" fill="white" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-sm" style={{ color: "#1A1A1A" }}>
              MEREQ Care
            </h4>
            <div className="flex items-center gap-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: "#00D084" }}
              />
              <p className="text-xs" style={{ color: "#9CA3AF" }}>
                Online now
              </p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] px-4 py-3 rounded-2xl"
                  style={{
                    backgroundColor: message.sender === "user" ? "#1A1A1A" : "#ECFDF5",
                    borderBottomRightRadius: message.sender === "user" ? "4px" : "16px",
                    borderBottomLeftRadius: message.sender === "agent" ? "4px" : "16px",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{
                      color: message.sender === "user" ? "#FFFFFF" : "#1A1A1A",
                    }}
                  >
                    {message.text}
                  </p>
                  <p
                    className="text-xs mt-1 text-right"
                    style={{
                      color:
                        message.sender === "user"
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(0,0,0,0.4)",
                    }}
                  >
                    {message.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex justify-start"
              >
                <div
                  className="px-4 py-3 rounded-2xl"
                  style={{ backgroundColor: "#ECFDF5" }}
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: "#00D084" }}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      {/* Sticky Chat Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="fixed bottom-0 left-0 right-0 p-4"
        style={{ backgroundColor: "#FFFFFF", maxWidth: "400px", margin: "0 auto" }}
      >
        <div
          className="flex items-center gap-3 p-2 rounded-full"
          style={{ backgroundColor: "#F5F5F5" }}
        >
          {/* Attachment Button */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M21.44 11.05L12.25 20.24C10.78 21.71 8.37 21.71 6.9 20.24C5.43 18.77 5.43 16.36 6.9 14.89L16.09 5.7C17.01 4.78 18.49 4.78 19.41 5.7C20.33 6.62 20.33 8.1 19.41 9.02L10.22 18.21C9.76 18.67 9.02 18.67 8.56 18.21C8.1 17.75 8.1 17.01 8.56 16.55L17.75 7.36"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "#1A1A1A" }}
          />

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
            style={{
              backgroundColor: newMessage.trim() ? "#00D084" : "#E5E5E5",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
