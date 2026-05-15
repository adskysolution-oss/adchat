"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  MessageSquare, 
  Users, 
  Phone, 
  Camera, 
  Plus, 
  MoreVertical, 
  Filter,
  CheckCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_CHATS = [
  {
    id: 1,
    name: "Aman Sharma",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aman",
    lastMessage: "Let's meet tomorrow at 10 AM for the project discussion.",
    time: "10:25 AM",
    unread: 2,
    status: "online",
    type: "personal",
    lastMessageStatus: "read"
  },
  {
    id: 2,
    name: "Tech Innovators Group",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TI",
    lastMessage: "Rahul: The new API is live now! 🚀",
    time: "09:45 AM",
    unread: 15,
    type: "group",
    lastMessageStatus: "sent"
  },
  {
    id: 3,
    name: "Cloud Hosting Services",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=CH",
    lastMessage: "Your invoice for May 2026 is ready.",
    time: "Yesterday",
    unread: 0,
    type: "business",
    verified: true,
    lastMessageStatus: "delivered"
  },
  {
    id: 4,
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    lastMessage: "Voice Note (0:45)",
    time: "Yesterday",
    unread: 0,
    status: "offline",
    type: "personal",
    lastMessageStatus: "read"
  },
  {
    id: 5,
    name: "Sneha (Business Agent)",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    lastMessage: "I've assigned your ticket to our technical team.",
    time: "Monday",
    unread: 0,
    type: "business",
    lastMessageStatus: "read"
  }
];

export default function ChatListPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [mode, setMode] = useState<"personal" | "business">("personal");

  const tabs = [
    { id: "all", label: "All Chats" },
    { id: "personal", label: "Personal" },
    { id: "groups", label: "Groups" },
    { id: "unread", label: "Unread" }
  ];

  return (
    <div className="flex flex-col h-screen bg-bg-light dark:bg-bg-dark max-w-md mx-auto relative shadow-2xl overflow-hidden">
      {/* Header */}
      <header className="p-4 space-y-4 glass sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-gradient">Sky Verse</h1>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMode(mode === "personal" ? "business" : "personal")}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5",
                mode === "personal" 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "bg-secondary/10 text-secondary border border-secondary/20"
              )}
            >
              {mode === "personal" ? <Zap className="w-3 h-3" /> : <Briefcase className="w-3 h-3" />}
              {mode === "personal" ? "Personal Mode" : "Business Mode"}
            </button>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <Camera className="w-5 h-5 text-foreground/70" />
              </button>
              <button className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-foreground/70" />
              </button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search messages..." 
            className="w-full h-11 bg-black/5 dark:bg-white/5 border border-transparent focus:border-primary/30 focus:bg-white dark:focus:bg-slate-900 rounded-xl pl-10 pr-4 outline-none transition-all text-sm"
          />
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 cursor-pointer hover:text-primary transition-colors" />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-bold transition-all border",
                activeTab === tab.id
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                  : "bg-black/5 dark:bg-white/5 text-foreground/60 border-transparent hover:border-border dark:hover:border-border-dark"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* Chat List */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="divide-y divide-border/50 dark:divide-border-dark/50">
          {MOCK_CHATS.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
              className="flex items-center gap-4 p-4 cursor-pointer relative group"
            >
              <div className="relative">
                <img 
                  src={chat.avatar} 
                  alt={chat.name} 
                  className="w-14 h-14 rounded-2xl object-cover bg-surface dark:bg-surface-dark border border-border dark:border-border-dark"
                />
                {chat.status === "online" && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-bg-light dark:border-bg-dark rounded-full" />
                )}
                {chat.type === "business" && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-secondary rounded-full flex items-center justify-center border-2 border-bg-light dark:border-bg-dark">
                    <Briefcase className="w-2.5 h-2.5 text-white" />
                  </div>
                )}
              </div>

              <div className="flex-1 min-w-0 py-1">
                <div className="flex justify-between items-start mb-0.5">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-foreground truncate">{chat.name}</h3>
                    {chat.verified && (
                      <div className="w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center">
                        <CheckCheck className="w-2 h-2 text-white" />
                      </div>
                    )}
                  </div>
                  <span className={cn(
                    "text-[10px] font-bold",
                    chat.unread > 0 ? "text-primary" : "text-foreground/40"
                  )}>
                    {chat.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={cn(
                    "text-sm truncate pr-4",
                    chat.unread > 0 ? "text-foreground font-semibold" : "text-foreground/50"
                  )}>
                    {chat.lastMessage}
                  </p>
                  {chat.unread > 0 ? (
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg shadow-primary/20">
                      {chat.unread}
                    </span>
                  ) : (
                    <CheckCheck className={cn(
                      "w-4 h-4",
                      chat.lastMessageStatus === "read" ? "text-blue-500" : "text-foreground/20"
                    )} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="absolute bottom-24 right-6 w-14 h-14 premium-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 text-white hover:scale-110 active:scale-95 transition-all z-30">
        <Plus className="w-7 h-7" />
      </button>

      {/* Bottom Navigation */}
      <nav className="h-20 glass border-t border-border/50 dark:border-border-dark/50 flex items-center justify-around px-2 sticky bottom-0 z-20">
        <NavItem icon={<MessageSquare className="w-6 h-6" />} label="Chats" active />
        <NavItem icon={<Users className="w-6 h-6" />} label="Groups" />
        <NavItem icon={<Zap className="w-6 h-6" />} label="Status" />
        <NavItem icon={<Phone className="w-6 h-6" />} label="Calls" />
        <NavItem 
          icon={
            <div className="relative">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" className="w-7 h-7 rounded-lg border-2 border-primary/20" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border border-white dark:border-slate-900 rounded-full" />
            </div>
          } 
          label="Me" 
        />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <button className="flex flex-col items-center gap-1 group relative px-4">
      {active && (
        <motion.div 
          layoutId="nav-active"
          className="absolute -top-4 w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
        />
      )}
      <div className={cn(
        "transition-all duration-300",
        active ? "text-primary scale-110" : "text-foreground/40 group-hover:text-foreground/70"
      )}>
        {icon}
      </div>
      <span className={cn(
        "text-[10px] font-bold tracking-wide uppercase transition-all",
        active ? "text-primary opacity-100" : "text-foreground/40 opacity-0 group-hover:opacity-100"
      )}>
        {label}
      </span>
    </button>
  );
}
