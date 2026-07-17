import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import chatApi from '../api/chatApi';

export default function ChatAssist() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am your CampusReserve assistant. I can help you find and book rooms. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatApi.assist(userMessage);
      if (response.success) {
        setMessages((prev) => [...prev, { role: 'ai', text: response.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'ai', text: response.error || 'Sorry, I encountered an error.' }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', text: error.response?.data?.error || 'Sorry, I failed to connect to the server. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 max-w-4xl mx-auto w-full">
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-4 ${
              msg.role === 'user' ? 'flex-row-reverse' : ''
            }`}
          >
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                msg.role === 'user'
                  ? 'bg-(--primary-color) text-white'
                  : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
              }`}
            >
              {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>

            <div
              className={`max-w-[80%] rounded-2xl px-6 py-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-(--primary-color) text-white rounded-tr-none'
                  : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
              }`}
            >
              <p className="whitespace-pre-wrap leading-relaxed text-[15px]">
                {msg.text}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center shadow-md">
              <Sparkles size={20} className="animate-pulse" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none px-6 py-4 shadow-sm flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-gray-200">
        <form
          onSubmit={handleSend}
          className="relative flex items-center max-w-3xl mx-auto"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to book a room, or check availability..."
            disabled={isLoading}
            className="w-full pl-6 pr-14 py-4 rounded-full border border-gray-300 focus:border-(--primary-color) focus:ring-2 focus:ring-emerald-100 outline-none transition-all shadow-sm disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-(--primary-color) hover:bg-emerald-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-(--primary-color)"
          >
            <Send size={20} className={input.trim() && !isLoading ? 'ml-0.5' : ''} />
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3">
          AI can make mistakes. Verify important bookings before confirming.
        </p>
      </div>
    </div>
  );
}
