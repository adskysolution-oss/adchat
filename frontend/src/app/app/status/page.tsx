"use client";

import React from "react";
import Link from "next/link";
import { Search, MoreVertical, Plus, ArrowLeft, Camera, Edit2 } from "lucide-react";

export default function StatusPage() {
  const recentUpdates = [
    {
      id: 1,
      name: "Alice Smith",
      avatar: "https://i.pravatar.cc/150?u=1",
      time: "10:30 AM",
      hasUnseen: true,
      storyCount: 3,
    },
    {
      id: 2,
      name: "Bob Jones",
      avatar: "https://i.pravatar.cc/150?u=2",
      time: "9:45 AM",
      hasUnseen: true,
      storyCount: 1,
    },
  ];

  const viewedUpdates = [
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?u=3",
      time: "Yesterday, 8:15 PM",
      hasUnseen: false,
      storyCount: 5,
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "https://i.pravatar.cc/150?u=4",
      time: "Yesterday, 2:00 PM",
      hasUnseen: false,
      storyCount: 2,
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / Main Content Area for Mobile */}
      <div className="w-full md:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative">
        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/app" className="mr-3 md:hidden">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <h1 className="text-xl font-bold">Updates</h1>
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
          {/* My Status */}
          <div className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
            <div className="relative mr-4">
              <img
                src="https://i.pravatar.cc/150?u=me"
                alt="My Status"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-indigo-600 text-white rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950">
                <Plus className="w-3 h-3" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">My status</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Tap to add status update</p>
            </div>
          </div>

          <div className="h-2 bg-slate-100 dark:bg-slate-900 w-full" />

          {/* Recent Updates */}
          <div className="px-4 pt-4 pb-2">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
              Recent updates
            </h4>
            {recentUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-center py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 -mx-2 cursor-pointer transition-colors"
              >
                <div className="relative mr-4">
                  <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                    <img
                      src={update.avatar}
                      alt={update.name}
                      className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{update.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{update.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Viewed Updates */}
          <div className="px-4 pt-4 pb-2">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">
              Viewed updates
            </h4>
            {viewedUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-center py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 -mx-2 cursor-pointer transition-colors opacity-70"
              >
                <div className="relative mr-4">
                  <div className="w-14 h-14 rounded-full p-[2px] bg-slate-300 dark:bg-slate-700">
                    <img
                      src={update.avatar}
                      alt={update.name}
                      className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{update.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{update.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-20 right-6 md:hidden flex flex-col items-center space-y-3">
          <button className="w-10 h-10 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95">
            <Edit2 className="w-5 h-5" />
          </button>
          <button className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
            <Camera className="w-6 h-6" />
          </button>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden flex items-center justify-around p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 absolute bottom-0 w-full z-10">
          <Link href="/app" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium mt-1">Chats</span>
          </Link>
          <Link href="/app/status" className="flex flex-col items-center p-2 text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span className="text-[10px] font-medium mt-1">Updates</span>
          </Link>
          <Link href="/app/calls" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <Phone className="w-6 h-6" />
            <span className="text-[10px] font-medium mt-1">Calls</span>
          </Link>
          <Link href="/app/settings" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-[10px] font-medium mt-1">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Empty State for Desktop Status Viewer */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Click on a contact to view their status update
        </h2>
      </div>
    </div>
  );
}

// Phone component definition to avoid missing import error
function Phone(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
