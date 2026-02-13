"use client";

import { useState, useEffect } from "react";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { Send, Bot, User } from "lucide-react";
import { SettingOutlined } from "@ant-design/icons";
import { Input, Button, message, Spin } from "antd";
import TextareaToolKit from "@/components/TextareaToolkit/TextareaToolKit";

const { TextArea } = Input;
export default function ChatPage() {
  const { messages, sendMessage, status } = useChat({
    onError: (error) => message.error(error.message),
  });
  const [input, setInput] = useState("");
  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (val: string) => {
    setInput(val);
  };

  const handleSubmit = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return message.error("请输入内容");
    void sendMessage({ text: trimmed });
    setInput("");
  };

  return (
    <div className="relative h-full flex flex-col w-full">
      {/* 消息展示区域 */}
      <div className="space-y-4 mb-[80px] overflow-y-auto">
        {messages.map((m: UIMessage) => {
          const text =
            m.parts
              ?.filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("") ?? "";
          const isLatest = m.id === messages[messages.length - 1]?.id;
          const showAiLoading = m.role !== "user" && isLoading && isLatest;
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
                {m.role === "user" ? (
                  <User size={20} />
                ) : showAiLoading ? (
                  <Spin size="small" />
                ) : (
                  <Bot size={20} style={{flexBasis: 'auto', flexGrow: 0, flexShrink: 0}} />
                )}
                <p className="text-sm leading-relaxed">{text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 输入区域 */}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border rounded-[4px]">
        <TextareaToolKit
          childToolMenus={[
            {
              key: 'setting',
              label: (
                <Button type="link" icon={<SettingOutlined />}>配置</Button>
              )
            }
          ]}
          textareaClass="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={input}
          isLoading={isLoading}
          textareaProps={{
            placeholder: "给豆豆提个问题吧..."
          }}
          onSubmit={() => handleSubmit()}
          onTextChange={(val: string) => handleInputChange(val)}
        >
          <Button type="primary">模型切换</Button>
        </TextareaToolKit>
      </div>
    </div>
  );
}
