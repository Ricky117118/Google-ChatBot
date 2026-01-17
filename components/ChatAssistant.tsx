import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, Terminal, Code2, Copy, Check } from 'lucide-react';
import { ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am the EduChain AI interface. I can process verification requests, issue command simulations, and answer queries about the credential ledger. How can I help you?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiView, setShowApiView] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showApiView]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(inputText);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Error processing request. Check API connection.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const ApiRequestPreview = () => (
    <div className="rounded-lg bg-slate-900 p-4 text-xs font-mono text-slate-300">
      <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
        <span className="text-green-400 font-bold">POST /v1/chat/completions</span>
        <button 
          onClick={() => copyToClipboard(`curl -X POST https://api.educhain.io/v1/chat \\
  -H "Content-Type: application/json" \\
  -d '{ "message": "Verify credential SBT-8821" }'`)}
          className="hover:text-white transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div className="space-y-1">
        <p><span className="text-purple-400">Host:</span> api.educhain.io</p>
        <p><span className="text-purple-400">Content-Type:</span> application/json</p>
        <p><span className="text-purple-400">Authorization:</span> Bearer {'<YOUR_API_KEY>'}</p>
        <br/>
        <p className="text-slate-500">// Example Body</p>
        <p>{`{`}</p>
        <p className="pl-4">"message": <span className="text-yellow-300">"{inputText || 'Verify credential...'}"</span></p>
        <p>{`}`}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full bg-slate-50">
      {/* Sidebar / Info Panel */}
      <div className="hidden w-80 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-slate-100 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <Bot size={20} />
          </div>
          <span className="font-bold text-slate-900">EduChain API</span>
        </div>
        
        <div className="flex-1 space-y-6 p-6">
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Status</h3>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
              </span>
              System Online
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Endpoints</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-2 rounded-md bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">
                <span className="text-indigo-600">POST</span> /chat
              </div>
              <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate-500">
                 <span className="text-slate-400">GET</span> /health
              </div>
            </div>
          </div>

          <div>
             <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Description</h3>
             <p className="text-sm leading-relaxed text-slate-600">
                This interface demonstrates the conversational capabilities of the EduChain Verification Ledger. 
                Use the chat window to interact with the underlying verification logic.
             </p>
          </div>
        </div>

        <div className="border-t border-slate-100 p-4">
           <button 
             onClick={() => setShowApiView(!showApiView)}
             className={`flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${showApiView ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
           >
             {showApiView ? <Terminal size={16} /> : <Code2 size={16} />}
             {showApiView ? 'Hide API Preview' : 'Show API Preview'}
           </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header (Mobile Only) */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
            <div className="flex items-center gap-2">
                <Bot size={20} className="text-indigo-600" />
                <span className="font-bold text-slate-900">EduChain Chat</span>
            </div>
            <button 
                onClick={() => setShowApiView(!showApiView)}
                className="p-2 text-slate-500"
            >
                <Code2 size={20} />
            </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Bot size={16} />
                  </div>
                )}
                
                <div
                  className={`relative max-w-[85%] rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-800 ring-1 ring-slate-100'
                  } ${msg.isError ? 'border border-red-200 bg-red-50 text-red-600' : ''}`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className={`mt-2 block text-[10px] opacity-70 ${msg.role === 'user' ? 'text-indigo-100' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                 <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 shadow-sm ring-1 ring-slate-100">
                    <Loader2 size={16} className="animate-spin text-indigo-600" />
                    <span className="text-sm text-slate-500">Processing request...</span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* API Preview Overlay (or inline if ample space, but overlay is safer for now) */}
        {showApiView && (
            <div className="absolute top-4 right-4 z-10 w-80 shadow-2xl animate-in slide-in-from-top-2">
                <ApiRequestPreview />
            </div>
        )}

        {/* Input Area */}
        <div className="border-t border-slate-200 bg-white p-4">
          <div className="mx-auto max-w-3xl">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-4 pl-6 pr-14 text-sm outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white transition-transform hover:scale-105 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:scale-100"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="mt-2 text-center text-xs text-slate-400">
              Powered by Gemini 1.5 Flash • <span className="hover:text-indigo-500 cursor-pointer">API Docs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};