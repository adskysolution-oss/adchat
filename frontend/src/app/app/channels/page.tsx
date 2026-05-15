"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Megaphone,
  CheckCircle2,
  Bell,
  BellOff
} from "lucide-react";

export default function ChannelsPage() {
  const channels = [
    {
      id: 1,
      name: "Sky Verse Official",
      avatar: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=150&fit=crop",
      followers: "2.4M",
      verified: true,
      muted: false,
      lastMessage: "Introducing our new AI-powered quick replies! 🚀 Check out the settings to enable them.",
      time: "10:30 AM",
      unread: 1
    },
    {
      id: 2,
      name: "Tech News Daily",
      avatar: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=150&h=150&fit=crop",
      followers: "850K",
      verified: true,
      muted: true,
      lastMessage: "Apple announces new event for next month. Here is what to expect...",
      time: "Yesterday",
      unread: 0
    },
    {
      id: 3,
      name: "Local Sports Club",
      avatar: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=150&h=150&fit=crop",
      followers: "12K",
      verified: false,
      muted: false,
      lastMessage: "Match postponed due to heavy rain. Will update with new date soon.",
      time: "Monday",
      unread: 0
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Mobile */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/app/status" className="mr-3">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <h1 className="text-xl font-bold flex items-center">
              <Megaphone className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Channels
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          <div className="p-4 border-b border-slate-100 dark:border-slate-800">
             <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Following</h2>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            {channels.map((channel) => (
              <div key={channel.id} className="px-4 py-3 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                <div className="relative mr-4 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={channel.avatar} alt={channel.name} className="w-full h-full object-cover" />
                  </div>
                  {channel.verified && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-0.5">
                    <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate pr-2">{channel.name}</h3>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {channel.time}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400 truncate pr-4">
                      {channel.lastMessage}
                    </p>
                    <div className="flex items-center space-x-2">
                       {channel.muted && <BellOff className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />}
                       {channel.unread > 0 && (
                         <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                           {channel.unread}
                         </div>
                       )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 text-center mt-4">
            <button className="px-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 font-semibold rounded-full transition-colors text-sm">
              Explore More Channels
            </button>
          </div>
        </div>
      </div>

      {/* Empty State for Desktop Detail View */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center mb-6 relative">
          <Megaphone className="w-12 h-12 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          Stay updated with Channels
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Follow your favorite organizations, creators, and interests to get the latest updates directly in Sky Verse.
        </p>
      </div>
    </div>
  );
}
