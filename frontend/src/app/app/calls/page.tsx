"use client";

import React, { useState } from "react";
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
  PhoneMissed 
} from "lucide-react";

export default function CallsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const dummyCalls = [
    {
      id: 1,
      name: "Alice Smith",
      avatar: "https://i.pravatar.cc/150?u=1",
      type: "incoming",
      media: "audio",
      time: "10:30 AM",
      date: "Today",
      missed: false,
    },
    {
      id: 2,
      name: "Bob Jones",
      avatar: "https://i.pravatar.cc/150?u=2",
      type: "outgoing",
      media: "video",
      time: "Yesterday, 8:45 PM",
      date: "Yesterday",
      missed: false,
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?u=3",
      type: "incoming",
      media: "audio",
      time: "Yesterday, 2:15 PM",
      date: "Yesterday",
      missed: true,
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "https://i.pravatar.cc/150?u=4",
      type: "outgoing",
      media: "audio",
      time: "Monday, 11:00 AM",
      date: "Monday",
      missed: false,
    },
    {
      id: 5,
      name: "Eve Adams",
      avatar: "https://i.pravatar.cc/150?u=5",
      type: "incoming",
      media: "video",
      time: "Sunday, 5:30 PM",
      date: "Sunday",
      missed: true,
    },
  ];

  const renderCallIcon = (type: string, missed: boolean) => {
    if (missed) return <PhoneMissed className="w-4 h-4 text-red-500 mr-2" />;
    if (type === "incoming") return <PhoneIncoming className="w-4 h-4 text-green-500 mr-2" />;
    return <PhoneOutgoing className="w-4 h-4 text-blue-500 mr-2" />;
  };

  const filteredCalls = activeTab === "all" ? dummyCalls : dummyCalls.filter(call => call.missed);

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / Main Content Area for Mobile */}
      <div className="w-full md:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center">
            <Link href="/app" className="mr-3 md:hidden">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <h1 className="text-xl font-bold">Calls</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800">
          <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab("all")}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === "all"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              All Calls
            </button>
            <button
              onClick={() => setActiveTab("missed")}
              className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${
                activeTab === "missed"
                  ? "bg-white dark:bg-slate-700 shadow-sm text-red-600 dark:text-red-400"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Missed
            </button>
          </div>
        </div>

        {/* Call Link */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-4">
              <PhoneCall className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Create call link</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Share a link for your Sky Verse call</p>
            </div>
          </div>
        </div>

        {/* Call List */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 py-2">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Recent
            </h4>
            {filteredCalls.map((call) => (
              <div
                key={call.id}
                className="flex items-center justify-between py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 -mx-2 cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <img
                    src={call.avatar}
                    alt={call.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className={`font-semibold ${call.missed ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                      {call.name}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                      {renderCallIcon(call.type, call.missed)}
                      <span>{call.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  {call.media === "audio" ? (
                    <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors">
                      <Phone className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-full transition-colors">
                      <Video className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-6 right-6 md:hidden">
          <button className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden flex items-center justify-around p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
          <Link href="/app" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium mt-1">Chats</span>
          </Link>
          <Link href="/app/status" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span className="text-[10px] font-medium mt-1">Updates</span>
          </Link>
          <Link href="/app/calls" className="flex flex-col items-center p-2 text-indigo-600 transition-colors">
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Calls</span>
          </Link>
          <Link href="/app/settings" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-[10px] font-medium mt-1">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Empty State for Desktop Call Details */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
          <Phone className="w-10 h-10 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Select a call
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Choose a call from your history to view details or start a new call.
        </p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg shadow-indigo-600/30 transition-all flex items-center">
          <PhoneCall className="w-5 h-5 mr-2" />
          Start New Call
        </button>
      </div>
    </div>
  );
}
