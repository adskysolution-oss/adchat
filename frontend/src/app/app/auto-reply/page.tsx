"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageSquarePlus, 
  Plus, 
  MoreVertical,
  Clock,
  User,
  Users,
  Power
} from "lucide-react";

export default function AutoReplyPage() {
  const [isMasterEnabled, setIsMasterEnabled] = useState(true);

  const autoReplies = [
    {
      id: 1,
      name: "Driving Mode",
      status: "active",
      message: "I'm currently driving and can't reply right now. I'll get back to you as soon as I can.",
      target: "all", // all, contacts, non_contacts
      exceptGroups: true
    },
    {
      id: 2,
      name: "Vacation",
      status: "inactive",
      message: "I'm on vacation until next Monday. For urgent matters, please email support@example.com.",
      target: "contacts",
      exceptGroups: false
    },
    {
      id: 3,
      name: "Sleep Time",
      status: "inactive",
      message: "I'm probably sleeping right now. Will reply in the morning! 😴",
      target: "all",
      schedule: "11:00 PM - 07:00 AM",
      exceptGroups: true
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / List View */}
      <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-4 flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/app/settings/power" className="mr-3">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
              </Link>
              <h1 className="text-xl font-bold flex items-center">
                Auto Reply
              </h1>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800/50 rounded-2xl">
            <div>
              <h2 className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center">
                <Power className={`w-4 h-4 mr-2 ${isMasterEnabled ? 'text-green-500' : 'text-slate-400'}`} />
                Master Switch
              </h2>
              <p className="text-xs text-indigo-700 dark:text-indigo-400/80 mt-1">
                {isMasterEnabled ? 'Auto replies are currently active' : 'All auto replies are currently paused'}
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="masterToggle" 
                  id="masterToggle" 
                  checked={isMasterEnabled}
                  onChange={() => setIsMasterEnabled(!isMasterEnabled)}
                  className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-500 z-10 top-0 left-0 transition-all duration-300"
                  style={{
                    transform: isMasterEnabled ? 'translateX(100%)' : 'translateX(0)',
                    borderColor: isMasterEnabled ? '#4f46e5' : '#cbd5e1'
                  }}
                />
                <label 
                  htmlFor="masterToggle" 
                  className={`toggle-label block overflow-hidden h-6 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300 ${isMasterEnabled ? 'bg-indigo-600 dark:bg-indigo-500' : ''}`}
                ></label>
            </div>
          </div>
        </header>

        {/* Rules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Your Rules
            </h2>
          </div>

          <div className={!isMasterEnabled ? 'opacity-50 pointer-events-none transition-opacity' : 'transition-opacity'}>
            {autoReplies.map((reply) => (
              <div 
                key={reply.id} 
                className={`p-4 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all mb-4 ${
                  reply.status === 'active' ? 'border-indigo-200 dark:border-indigo-800' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                        reply.status === 'active' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                     }`}>
                       <MessageSquarePlus className="w-5 h-5" />
                     </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">{reply.name}</h3>
                      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {reply.schedule ? (
                          <><Clock className="w-3 h-3 mr-1" /> {reply.schedule}</>
                        ) : (
                          "Always active when enabled"
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                      <input 
                        type="checkbox" 
                        defaultChecked={reply.status === 'active'}
                        className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-500 z-10 top-0 left-0 transition-all duration-300"
                      />
                      <label className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer"></label>
                  </div>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                   <p className="text-sm text-slate-700 dark:text-slate-300 italic">"{reply.message}"</p>
                </div>

                <div className="flex items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span className="flex items-center mr-4">
                    <User className="w-3.5 h-3.5 mr-1" /> 
                    {reply.target === 'all' ? 'Everyone' : reply.target === 'contacts' ? 'My Contacts' : 'Non-Contacts'}
                  </span>
                  {reply.exceptGroups && (
                    <span className="flex items-center line-through decoration-slate-400 opacity-70">
                      <Users className="w-3.5 h-3.5 mr-1" /> Groups
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 border-2 border-dashed border-indigo-200 dark:border-indigo-800/50 text-indigo-600 dark:text-indigo-400 font-semibold rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Create New Rule
          </button>
        </div>
      </div>

      {/* Desktop Form View (Empty State) */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-[2rem] shadow-lg flex items-center justify-center mb-6 relative border border-slate-100 dark:border-slate-700">
          <MessageSquarePlus className="w-10 h-10 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 text-center">
          Automate your replies
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Set up automatic replies when you're busy, sleeping, or driving. Customize rules based on schedules and contacts.
        </p>
      </div>
    </div>
  );
}
