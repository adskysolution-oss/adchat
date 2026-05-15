"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Search, 
  Paperclip, 
  Smile, 
  Mic, 
  Send,
  User,
  ShoppingBag,
  Tag,
  Clock,
  ChevronRight,
  PlusCircle,
  FileText,
  UserCheck,
  UserPlus,
  ShieldCheck,
  BookOpen,
  Zap,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessChatPage() {
  const [message, setMessage] = useState("");
  const [isAgentAssigned, setIsAgentAssigned] = useState(false);
  const [internalNotes, setInternalNotes] = useState<any[]>([]);
  const [showNotes, setShowNotes] = useState(false);
  const [activeTab, setActiveTab] = useState<'CHAT' | 'NOTES'>('CHAT');

  const messages = [
    { id: 1, text: "Hi, I'm interested in your premium plan.", sender: "customer", time: "10:30 AM" },
    { id: 2, text: "Hello! Thank you for your interest. The premium plan includes advanced CRM features.", sender: "business", time: "10:32 AM" },
  ];

  const assignToMe = () => {
    setIsAgentAssigned(true);
    // In real app, emit 'agent_assigned' via socket
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950/50 relative">
        
        {/* Header */}
        <header className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center">
            <Link href="/business" className="mr-3 lg:hidden">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div className="flex items-center">
              <div className="relative">
                <img src="https://i.pravatar.cc/150?u=customer1" alt="John" className="w-10 h-10 rounded-full border-2 border-green-500" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
              </div>
              <div className="ml-3">
                <h2 className="font-bold text-sm">John Doe</h2>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500">via Website</span>
                  <span className="text-[10px] px-1.5 bg-yellow-100 text-yellow-700 rounded font-bold uppercase tracking-wider">Hot Lead</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!isAgentAssigned ? (
              <button 
                onClick={assignToMe}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-md transition-all flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" /> Assign to Me
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg text-[10px] font-bold uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Assigned to You
              </div>
            )}
            <button className="p-2 text-slate-400 hover:text-indigo-600"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </header>

        {/* Tabs for Agent */}
        <div className="flex bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button 
            onClick={() => setActiveTab('CHAT')}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'CHAT' ? "text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30" : "text-slate-400"
            )}
          >
            Customer Chat
          </button>
          <button 
            onClick={() => setActiveTab('NOTES')}
            className={cn(
              "flex-1 py-2.5 text-xs font-bold uppercase tracking-widest transition-all",
              activeTab === 'NOTES' ? "text-amber-600 border-b-2 border-amber-600 bg-amber-50/30" : "text-slate-400"
            )}
          >
            Internal Notes
          </button>
        </div>

        {/* Chat / Notes Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'CHAT' ? (
            <>
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.sender === "business" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[70%] p-3 rounded-2xl shadow-sm text-sm",
                    msg.sender === "business" 
                      ? "bg-indigo-600 text-white rounded-tr-none" 
                      : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-200 rounded-tl-none"
                  )}>
                    {msg.text}
                    <p className="text-[10px] text-right mt-1 opacity-70">{msg.time}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900 p-3 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center text-white text-[10px] font-bold">JD</div>
                  <span className="text-xs font-bold">Jason (Manager)</span>
                  <span className="text-[10px] text-slate-400 ml-auto">10:45 AM</span>
                </div>
                <p className="text-xs text-amber-900 dark:text-amber-400">Customer is asking for a discount. Check if we can offer 10% off for the annual plan.</p>
              </div>
              <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">Only agents can see these notes</p>
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          {!isAgentAssigned && activeTab === 'CHAT' ? (
            <div className="absolute inset-x-0 bottom-0 top-0 bg-white/60 dark:bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center z-20">
              <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 text-center max-w-xs">
                <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="font-bold text-lg mb-2">Unassigned Chat</h3>
                <p className="text-sm text-slate-500 mb-6">You need to assign this chat to yourself to start replying to the customer.</p>
                <button 
                  onClick={assignToMe}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
                >
                  Assign to Me
                </button>
              </div>
            </div>
          ) : null}

          {/* Quick Replies */}
          {activeTab === 'CHAT' && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 mb-1">
              {['/pricing', '/greeting', '/demo'].map(q => (
                <button key={q} className="shrink-0 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                  {q}
                </button>
              ))}
              <button className="shrink-0 px-3 py-1 border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 text-xs font-bold rounded-full flex items-center gap-1">
                <PlusCircle className="w-3.5 h-3.5" /> Manage
              </button>
            </div>
          )}

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-2 rounded-2xl">
            <button className="p-2 text-slate-400 hover:text-indigo-600"><Paperclip className="w-6 h-6" /></button>
            <input 
              placeholder={activeTab === 'CHAT' ? "Type your message..." : "Add an internal note..."}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
            />
            <button className={cn(
              "p-2 rounded-xl transition-all",
              activeTab === 'CHAT' ? "bg-indigo-600 text-white shadow-lg" : "bg-amber-500 text-white shadow-lg"
            )}>
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* CRM Sidebar */}
      <div className="hidden lg:flex w-96 flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
        <header className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 flex items-center justify-between">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">Lead CRM</h3>
          <button className="text-xs font-bold text-indigo-600 hover:underline">View Full Profile</button>
        </header>

        <div className="p-6 text-center border-b border-slate-100 dark:border-slate-800">
          <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900 rounded-3xl flex items-center justify-center text-indigo-600 text-3xl font-bold mx-auto mb-4 shadow-xl shadow-indigo-600/10">
            JD
          </div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-sm text-slate-500">+1 234 567 890</p>
          <div className="flex justify-center gap-2 mt-4">
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600"><Phone className="w-5 h-5" /></button>
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-blue-600"><Video className="w-5 h-5" /></button>
            <button className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-green-600"><ShoppingBag className="w-5 h-5" /></button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5" /> Pipeline Status
            </h4>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-xl flex items-center justify-between">
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">INTERESTED</span>
              <ChevronRight className="w-4 h-4 text-indigo-400" />
            </div>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" /> Requirement
            </h4>
            <p className="text-sm font-medium leading-relaxed">Looking for a premium messaging plan for a team of 50 agents with CRM integration.</p>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" /> Custom Labels
            </h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-[10px] font-bold rounded-lg uppercase">Hot Lead</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-lg uppercase">Tech Team</span>
              <button className="px-3 py-1 border border-dashed border-slate-300 text-[10px] font-bold rounded-lg uppercase text-slate-400">+ Add</button>
            </div>
          </section>

          <section>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Activity
            </h4>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                <div>
                  <p className="text-xs font-bold">Chat Assigned to You</p>
                  <p className="text-[10px] text-slate-500">Just now</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mt-1.5" />
                <div>
                  <p className="text-xs font-bold">Lead Created</p>
                  <p className="text-[10px] text-slate-500">Today, 10:30 AM</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
