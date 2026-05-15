"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MoreVertical, Plus, ArrowLeft, Camera, Edit2, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatusPage() {
  const [statuses, setStatuses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserStatus, setSelectedUserStatus] = useState<any | null>(null);
  const [showStatusCreator, setShowStatusCreator] = useState(false);
  const [newStatusText, setNewStatusText] = useState("");

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/status`);
      const data = await res.json();
      setStatuses(data);
    } catch (error) {
      console.error("Failed to fetch statuses", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStatus = async () => {
    if (!newStatusText.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'TEXT',
          content: newStatusText,
          backgroundColor: '#4f46e5'
        }),
      });
      if (res.ok) {
        setNewStatusText("");
        setShowStatusCreator(false);
        fetchStatuses();
      }
    } catch (error) {
      console.error("Failed to create status", error);
    }
  };

  const myStatus = statuses.find(s => s.userId === 'demo-user-id'); // Placeholder
  const recentUpdates = statuses.filter(s => s.userId !== 'demo-user-id');

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      <div className="w-full md:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 relative">
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

        <div className="flex-1 overflow-y-auto pb-20">
          {/* My Status */}
          <div 
            className="p-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
            onClick={() => setShowStatusCreator(true)}
          >
            <div className="relative mr-4">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
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
            {loading ? (
              <p className="text-center py-4 text-slate-400">Loading...</p>
            ) : recentUpdates.length === 0 ? (
              <p className="text-center py-4 text-slate-400">No updates yet</p>
            ) : (
              recentUpdates.map((status) => (
                <div
                  key={status.id}
                  className="flex items-center py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl px-2 -mx-2 cursor-pointer transition-colors"
                  onClick={() => setSelectedUserStatus(status)}
                >
                  <div className="relative mr-4">
                    <div className="w-14 h-14 rounded-full p-[2px] bg-gradient-to-tr from-indigo-500 to-purple-500">
                      <img
                        src={status.user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${status.user.firstName}`}
                        alt={status.user.firstName}
                        className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-950"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{status.user.firstName} {status.user.lastName}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {new Date(status.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="absolute bottom-20 right-6 md:hidden flex flex-col items-center space-y-3">
          <button 
            onClick={() => setShowStatusCreator(true)}
            className="w-10 h-10 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-95"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
            <Camera className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop View Content */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
        {!selectedUserStatus ? (
          <div className="flex flex-col items-center text-center max-w-md">
            <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Stay connected with your contacts
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Updates shared by your contacts will appear here. Click on an update to view it.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl aspect-[9/16] max-h-[80vh] bg-black rounded-3xl overflow-hidden relative shadow-2xl">
            {selectedUserStatus.mediaUrl ? (
              <img src={selectedUserStatus.mediaUrl} className="w-full h-full object-contain" />
            ) : (
              <div 
                className="w-full h-full flex items-center justify-center p-12 text-center text-white text-3xl font-bold"
                style={{ backgroundColor: selectedUserStatus.backgroundColor || '#4f46e5' }}
              >
                {selectedUserStatus.content}
              </div>
            )}
            <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src={selectedUserStatus.user.profileImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUserStatus.user.firstName}`} 
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div className="text-white">
                  <h4 className="font-bold">{selectedUserStatus.user.firstName}</h4>
                  <p className="text-xs opacity-70">Today, {new Date(selectedUserStatus.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
              <button onClick={() => setSelectedUserStatus(null)} className="text-white hover:bg-white/20 p-2 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Status Creator Modal */}
      {showStatusCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-md bg-indigo-600 rounded-3xl p-8 relative flex flex-col items-center justify-center min-h-[400px]">
            <button 
              onClick={() => setShowStatusCreator(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            <textarea
              value={newStatusText}
              onChange={(e) => setNewStatusText(e.target.value)}
              placeholder="Type a status..."
              className="w-full bg-transparent border-none text-white text-3xl font-bold text-center placeholder:text-white/40 focus:ring-0 resize-none no-scrollbar"
              autoFocus
            />
            <div className="absolute bottom-8 right-8">
              <button 
                onClick={handleCreateStatus}
                className="w-14 h-14 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-xl active:scale-95 transition-transform"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
