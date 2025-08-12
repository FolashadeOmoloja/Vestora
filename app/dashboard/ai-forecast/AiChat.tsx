import { chatMessages } from "@/app/utils/dummy";
import { Bot, User, Send } from "lucide-react";
import { useState } from "react";

const AiChat = () => {
  const [message, setMessage] = useState("");
  return (
    <div className="flex flex-col h-[600px]">
      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {chatMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${
                msg.type === "user" ? "justify-end" : ""
              }`}
            >
              {msg.type === "ai" && (
                <div className="w-8 h-8 bg-[#002C6C] rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.type === "user"
                    ? "bg-[#002C6C] text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{msg.message}</p>
              </div>
              {msg.type === "user" && (
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask me anything about NTB investments..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#002C6C] focus:border-[#002C6C] outline-none"
          />
          <button className="bg-[#002C6C] text-white p-2 rounded-lg hover:bg-[#001a4d] transition-colors">
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          AI responses are generated and may not reflect actual investment
          advice.
        </p>
      </div>
    </div>
  );
};

export default AiChat;
