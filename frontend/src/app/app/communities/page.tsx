"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  MoreVertical, 
  Users,
  ChevronRight,
  Megaphone,
  MessageCircle
} from "lucide-react";

export default function CommunitiesPage() {
  const communities = [
    {
      id: 1,
      name: "Tech Enthusiasts HQ",
      avatar: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=150&fit=crop",
      groups: 4,
      announcementMessage: "Welcome to our new hardware discussion channel!",
      time: "10:45 AM"
    },
    {
      id: 2,
      name: "Local Neighborhood",
      avatar: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=150&h=150&fit=crop",
      groups: 2,
      announcementMessage: "Weekend farmer's market schedule updated.",
      time: "Yesterday"
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Mobile */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/app" className="mr-3 md:hidden">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <h1 className="text-xl font-bold">Communities</h1>
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* New Community Button */}
          <div className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors border-b border-slate-100 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-slate-800 flex items-center justify-center mr-4 relative">
              <Users className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm text-white text-lg font-medium leading-none pb-0.5">+</div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">New Community</h3>
            </div>
          </div>

          <div className="h-2 bg-slate-100 dark:bg-slate-900 w-full" />

          {/* Communities List */}
          <div>
            {communities.map((community) => (
              <div key={community.id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-2">
                {/* Community Header */}
                <div className="px-4 py-3 flex items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl overflow-hidden mr-3 flex-shrink-0">
                    <img src={community.avatar} alt={community.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base flex-1">{community.name}</h3>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </div>
                
                {/* Announcements Channel preview */}
                <div className="px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center">
                   <div className="w-10 flex justify-center mr-3">
                     <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                       <Megaphone className="w-4 h-4 text-green-600 dark:text-green-400" />
                     </div>
                   </div>
                   <div className="flex-1 min-w-0">
                     <div className="flex justify-between items-center mb-0.5">
                       <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">Announcements</h4>
                       <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap ml-2">{community.time}</span>
                     </div>
                     <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{community.announcementMessage}</p>
                   </div>
                </div>

                <div className="px-4 py-3 pl-16">
                  <Link href="#" className="text-sm font-medium text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center">
                    <ChevronRight className="w-4 h-4 mr-1" /> View all {community.groups} groups
                  </Link>
                </div>
                
                <div className="h-2 bg-slate-100 dark:bg-slate-900 w-full mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden flex items-center justify-around p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 absolute bottom-0 w-full z-10">
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
          <Link href="/app/communities" className="flex flex-col items-center p-2 text-indigo-600 transition-colors">
            <Users className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Communities</span>
          </Link>
          <Link href="/app/calls" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span className="text-[10px] font-medium mt-1">Calls</span>
          </Link>
        </nav>
      </div>

      {/* Empty State for Desktop Detail View */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-32 h-32 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center mb-6 relative">
          <Users className="w-16 h-16 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          Stay connected with a community
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Communities bring related groups together in one place. Connect your school, neighborhood, or workplace.
        </p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all">
          Start your community
        </button>
      </div>
    </div>
  );
}
