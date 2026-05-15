"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "@/components/ui/SplashScreen";
import LoginPage from "./login/page";
import ChatListPage from "./app/page";
import BusinessDashboard from "./business/page";
import AdminDashboard from "./admin/page";
import ChatScreen from "./app/chat/page";
import { 
  Smartphone, 
  LayoutDashboard, 
  ShieldCheck, 
  MessageSquare,
  ChevronRight,
  Monitor,
  Zap,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePreview, setActivePreview] = useState<"login" | "app" | "chat" | "business" | "admin">("login");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  const PREVIEWS = [
    { id: "login", label: "Login / OTP", icon: <Smartphone />, description: "Secure authentication flow" },
    { id: "app", label: "App Home", icon: <MessageSquare />, description: "Chat list & navigation" },
    { id: "chat", label: "Chat Screen", icon: <Zap />, description: "Rich messaging interface" },
    { id: "business", label: "Business CRM", icon: <LayoutDashboard />, description: "Lead & Catalog management" },
    { id: "admin", label: "Super Admin", icon: <ShieldCheck />, description: "System control center" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col">
      {/* Navigation Header */}
      <header className="h-16 border-b border-white/5 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 premium-gradient rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Sky Verse <span className="text-primary text-xs ml-1 uppercase opacity-60">Preview</span></span>
        </div>

        <div className="flex gap-4">
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            <button className="px-3 py-1 bg-primary text-[10px] font-black uppercase rounded-lg">Web Preview</button>
            <button className="px-3 py-1 text-[10px] font-black uppercase opacity-40 hover:opacity-100 transition-opacity">Mobile Demo</button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Selection Sidebar */}
        <aside className="w-80 border-r border-white/5 p-6 space-y-6 bg-slate-950/30">
          <div className="space-y-1">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 px-2">UI Modules</h2>
            {PREVIEWS.map((prev) => (
              <button
                key={prev.id}
                onClick={() => setActivePreview(prev.id as any)}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all group",
                  activePreview === prev.id 
                    ? "bg-primary/10 border border-primary/20 text-white shadow-[0_0_20px_rgba(99,102,241,0.1)]" 
                    : "text-white/40 hover:bg-white/5"
                )}
              >
                <div className={cn(
                  "p-2 rounded-xl transition-all",
                  activePreview === prev.id ? "bg-primary text-white" : "bg-white/5 group-hover:bg-white/10"
                )}>
                  {prev.icon}
                </div>
                <div className="text-left flex-1">
                  <p className="text-sm font-bold">{prev.label}</p>
                  <p className="text-[10px] opacity-60 font-medium">{prev.description}</p>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  activePreview === prev.id ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                )} />
              </button>
            ))}
          </div>

          <div className="mt-8 p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-12 h-12" />
            </div>
            <h3 className="text-sm font-bold mb-2">Build Ready</h3>
            <p className="text-xs text-white/50 leading-relaxed mb-4">This UI is built with backend scalability in mind, using standard React patterns and responsive CSS.</p>
            <div className="flex items-center gap-2 text-[10px] font-black text-primary">
              <CheckCircle2 className="w-3 h-3" /> NODE.JS COMPATIBLE
            </div>
          </div>
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-black relative overflow-hidden flex flex-col">
          <div className="h-10 bg-slate-900/50 border-b border-white/5 flex items-center justify-center gap-4 px-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-500/50" />
              <div className="w-2 h-2 rounded-full bg-amber-500/50" />
              <div className="w-2 h-2 rounded-full bg-green-500/50" />
            </div>
            <div className="flex-1 max-w-sm h-6 bg-black/40 rounded-lg border border-white/5 flex items-center justify-center px-4">
              <span className="text-[10px] font-mono text-white/30 truncate">skyverse.app/{activePreview}</span>
            </div>
            <div className="w-16" />
          </div>

          <div className="flex-1 overflow-auto bg-[#020617] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePreview}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {activePreview === "login" && <LoginPage />}
                {activePreview === "app" && <ChatListPage />}
                {activePreview === "chat" && <ChatScreen />}
                {activePreview === "business" && <BusinessDashboard />}
                {activePreview === "admin" && <AdminDashboard />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}
