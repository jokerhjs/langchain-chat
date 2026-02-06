"use client";

import { useState } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { Send, Bot, User } from "lucide-react";
import { SendOutlined } from "@ant-design/icons";
import { Input, Button, message } from "antd";

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    onError: (error) => message.error(error.message),
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (val: string) => {
    setInput(val);
  };

  const handleSubmit = async (event?: { preventDefault?: () => void }) => {
    event?.preventDefault?.();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return message.error("请输入内容");
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="relative h-full flex flex-col w-full px-4">
      {/* 消息展示区域 */}
      <div className="space-y-4 mb-8">
        {messages.map((m: UIMessage) => {
          const text = m.parts
            .filter((part) => part.type === "text")
            .map((part) => part.text)
            .join("");
          return (
            <div
              key={m.id}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start gap-3 max-w-[80%] p-4 rounded-lg ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {m.role === "user" ? <User size={20} /> : <Bot size={20} />}
                <p className="text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 输入区域 */}
      <form
        onSubmit={handleSubmit}
        className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t"
      >
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={input}
            placeholder="问问 AI..."
            onChange={(val) => handleInputChange(val.target.value)}
          />
          <Button
            htmlType="submit"
            loading={isLoading}
            className="p-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
          >
            <SendOutlined size={20} />
          </Button>
        </div>
      </form>
    </div>
  );
}
