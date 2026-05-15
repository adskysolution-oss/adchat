"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Image as ImageIcon, 
  Paperclip, 
  Mic, 
  Send, 
  Smile,
  CheckCheck,
  File,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_MESSAGES = [
  { id: 1, text: "Hey! Did you see the new design for Sky Verse?", sender: "other", time: "10:15 AM", status: "read" },
  { id: 2, text: "Yes, it looks absolutely stunning! 🚀", sender: "me", time: "10:16 AM", status: "read" },
  { id: 3, text: "The glassmorphism and the premium animations are next level.", sender: "other", time: "10:17 AM", status: "read" },
  { id: 4, text: "I'm working on the Business Dashboard now. It's going to be very helpful for sellers.", sender: "me", time: "10:18 AM", status: "read" },
  { id: 5, type: "image", src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400", sender: "other", time: "10:20 AM", status: "read" },
  { id: 6, text: "Check this out, it's a preview of the new UI.", sender: "other", time: "10:20 AM", status: "read" },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-[#f1f5f9] dark:bg-[#020617] max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <header className="h-20 glass sticky top-0 z-20 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <button className="p-2 -ml-2 text-foreground/60 hover:text-primary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aman" className="w-10 h-10 rounded-xl bg-surface dark:bg-surface-dark border border-border/50" />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-foreground">Aman Sharma</h3>
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Online</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-foreground/60 hover:text-primary transition-colors">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-foreground/60 hover:text-primary transition-colors">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-foreground/60 hover:text-primary transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <main 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)', backgroundSize: '24px 24px' }}
      >
        <div className="flex justify-center my-4">
          <div className="px-4 py-1.5 rounded-full glass text-[10px] font-bold text-foreground/40 uppercase tracking-widest flex items-center gap-2">
            <Lock className="w-3 h-3" /> End-to-end Encrypted
          </div>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.sender === "me" ? "ml-auto items-end" : "items-start"
              )}
            >
              <div className={cn(
                "p-3.5 rounded-2xl shadow-sm relative group",
                msg.sender === "me" 
                  ? "bg-primary text-white rounded-tr-none" 
                  : "bg-white dark:bg-slate-900 text-foreground rounded-tl-none border border-border/50 dark:border-border-dark/50"
              )}>
                {msg.type === "image" ? (
                  <div className="space-y-2">
                    <img src={msg.src} className="rounded-xl w-full object-cover max-h-60" />
                    {msg.text && <p className="text-sm">{msg.text}</p>}
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
                
                <div className={cn(
                  "flex items-center gap-1 mt-1 justify-end",
                  msg.sender === "me" ? "text-white/60" : "text-foreground/30"
                )}>
                  <span className="text-[10px] font-medium">{msg.time}</span>
                  {msg.sender === "me" && (
                    <CheckCheck className={cn("w-3 h-3", msg.status === "read" ? "text-blue-200" : "text-white/40")} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {/* Input Area */}
      <footer className="p-4 bg-white dark:bg-bg-dark border-t border-border/50 dark:border-border-dark/50 z-20">
        <div className="flex items-end gap-2">
          <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-[24px] p-1.5 flex items-end gap-1 border border-transparent focus-within:border-primary/20 transition-all">
            <button className="p-2.5 text-foreground/40 hover:text-primary transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none py-2.5 px-2 text-sm max-h-32 no-scrollbar"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <div className="flex items-center pb-1">
              <button className="p-2.5 text-foreground/40 hover:text-primary transition-colors">
                <Paperclip className="w-5 h-5" />
              </button>
              <button className="p-2.5 text-foreground/40 hover:text-primary transition-colors">
                <ImageIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button 
            onClick={handleSendMessage}
            className={cn(
              "w-12 h-12 rounded-full flex items-center justify-center transition-all",
              inputValue.trim() ? "premium-gradient text-white shadow-lg shadow-primary/20" : "bg-slate-200 dark:bg-slate-800 text-foreground/20"
            )}
          >
            {inputValue.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        </div>
      </footer>
    </div>
  );
}
