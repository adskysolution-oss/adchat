"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Phone, 
  Video, 
  Search, 
  Plus, 
  MoreVertical, 
  ArrowLeft, 
  PhoneCall, 
  PhoneIncoming, 
  PhoneOutgoing, 
  PhoneMissed,
  Clock,
  Trash2,
  ChevronRight
} from "lucide-react";
import { useCall } from "@/context/CallContext";
import { cn } from "@/lib/utils";

export default function CallsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [calls, setCalls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { initiateCall } = useCall();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/calls/history`);
        const data = await res.json();
        setCalls(data);
      } catch (err) {
        console.error("Failed to fetch call history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const renderCallIcon = (type: string, status: string, isCaller: boolean) => {
    if (status === "MISSED") return <PhoneMissed className="w-4 h-4 text-red-500 mr-2" />;
    if (!isCaller) return <PhoneIncoming className="w-4 h-4 text-green-500 mr-2" />;
    return <PhoneOutgoing className="w-4 h-4 text-blue-500 mr-2" />;
  };

  const filteredCalls = activeTab === "all" ? calls : calls.filter(call => call.status === "MISSED");

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / List */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-10 shadow-2xl">
        <header className="px-6 py-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <Link href="/app" className="lg:hidden p-2 -ml-2 text-slate-500">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-black tracking-tight">Call Logs</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-6 py-4">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("all")}
              className={cn(
                "flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                activeTab === "all" ? "bg-white dark:bg-slate-700 shadow-md text-indigo-600 dark:text-white" : "text-slate-400"
              )}
            >
              All Calls
            </button>
            <button
              onClick={() => setActiveTab("missed")}
              className={cn(
                "flex-1 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                activeTab === "missed" ? "bg-white dark:bg-red-900 shadow-md text-red-600 dark:text-white" : "text-slate-400"
              )}
            >
              Missed
            </button>
          </div>
        </div>

        {/* Call List */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2 no-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Loading History...</p>
            </div>
          ) : filteredCalls.length === 0 ? (
             <div className="flex flex-col items-center justify-center h-64 text-center p-8">
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-4">
                   <Phone className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="font-bold text-lg">No calls found</h3>
                <p className="text-sm text-slate-500">Your call logs will appear here once you start communicating.</p>
             </div>
          ) : (
            filteredCalls.map((call) => {
              const otherParticipant = call.participants.find((p: any) => p.userId !== 'demo-user-id')?.user;
              const isCaller = call.callerId === 'demo-user-id';
              
              return (
                <div
                  key={call.id}
                  className="group flex items-center justify-between p-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-3xl transition-all cursor-pointer border border-transparent hover:border-slate-200 dark:hover:border-slate-800 shadow-sm hover:shadow-xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={otherParticipant?.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${otherParticipant?.id}`}
                        className="w-14 h-14 rounded-2xl object-cover bg-slate-200"
                      />
                      <div className={cn(
                        "absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-4 border-white dark:border-slate-950 flex items-center justify-center",
                        call.type.includes("VIDEO") ? "bg-indigo-600" : "bg-green-600"
                      )}>
                        {call.type.includes("VIDEO") ? <Video className="w-3 h-3 text-white" /> : <Phone className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div>
                      <h3 className={cn("font-bold", call.status === "MISSED" ? "text-red-500" : "text-slate-900 dark:text-white")}>
                        {otherParticipant?.firstName || "Unknown User"} {otherParticipant?.lastName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        {renderCallIcon(call.type, call.status, isCaller)}
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {new Date(call.createdAt).toLocaleDateString()} • {new Date(call.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => initiateCall([otherParticipant.id], call.type)}
                      className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl hover:scale-110 transition-transform"
                    >
                      {call.type.includes("VIDEO") ? <Video className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Panel / Empty State */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 relative">
        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -ml-48 -mb-48" />

        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-transform duration-500">
            <PhoneCall className="w-12 h-12 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Select a conversation</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-10 font-medium">
            Stay connected with your team and customers. High-quality voice and video calls are just one tap away.
          </p>
          <div className="grid grid-cols-2 gap-4 w-full max-w-md">
             <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-3">
                   <Phone className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="font-bold text-sm">HD Voice</h4>
                <p className="text-[10px] text-slate-500 uppercase font-black mt-1">Crystal Clear</p>
             </div>
             <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-3">
                   <Video className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="font-bold text-sm">4K Video</h4>
                <p className="text-[10px] text-slate-500 uppercase font-black mt-1">Low Latency</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
