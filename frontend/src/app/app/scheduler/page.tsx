"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  MoreVertical, 
  Calendar,
  Clock,
  User,
  Send,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function MessageSchedulerPage() {
  const scheduledMessages = [
    {
      id: 1,
      contactName: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=customer1",
      message: "Hey John, just following up on our meeting from yesterday. Let me know if you need any further information.",
      date: "Tomorrow",
      time: "09:00 AM",
      status: "pending",
      recurring: false
    },
    {
      id: 2,
      contactName: "Project Alpha Team",
      avatar: "https://i.pravatar.cc/150?u=group",
      isGroup: true,
      message: "Weekly status update reminder! Please drop your updates in the chat by EOD.",
      date: "Every Friday",
      time: "10:00 AM",
      status: "active",
      recurring: true
    },
    {
      id: 3,
      contactName: "Sarah Smith",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      message: "Happy Birthday! Hope you have a wonderful day.",
      date: "Oct 15, 2026",
      time: "00:00 AM",
      status: "pending",
      recurring: true
    },
    {
      id: 4,
      contactName: "Mom",
      avatar: "https://i.pravatar.cc/150?u=mom",
      message: "Call you in 10 mins!",
      date: "Today",
      time: "02:30 PM",
      status: "sent",
      recurring: false
    }
  ];

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case 'active': return "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400";
      case 'sent': return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400";
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return <Clock className="w-3.5 h-3.5 mr-1" />;
      case 'active': return <AlertCircle className="w-3.5 h-3.5 mr-1" />;
      case 'sent': return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / List View */}
      <div className="w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-4 flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/app/settings/power" className="mr-3">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
              </Link>
              <h1 className="text-xl font-bold flex items-center">
                Message Scheduler
              </h1>
            </div>
            <button className="hidden md:flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-1" /> New Schedule
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search scheduled messages..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-shadow"
            />
          </div>
        </header>

        {/* Scheduled Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24 md:pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Upcoming & Sent
            </h2>
            <button className="text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:underline">
              Filter
            </button>
          </div>

          {scheduledMessages.map((item) => (
            <div 
              key={item.id} 
              className={`p-4 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all group ${
                item.status === 'sent' ? 'border-slate-100 dark:border-slate-800 opacity-70' : 'border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-300 dark:hover:border-indigo-700'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <div className="relative">
                    <img src={item.avatar} alt={item.contactName} className="w-10 h-10 rounded-full object-cover mr-3 border border-slate-200 dark:border-slate-700" />
                    {item.isGroup && (
                       <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-indigo-500 border-2 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                         <User className="w-3 h-3 text-white" />
                       </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.contactName}</h3>
                    <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date} • {item.time}
                      {item.recurring && <span className="ml-2 text-indigo-500 font-medium">(Recurring)</span>}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800 relative">
                 <p className="text-sm text-slate-700 dark:text-slate-300 italic line-clamp-2">"{item.message}"</p>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center ${getStatusStyle(item.status)}`}>
                  {getStatusIcon(item.status)}
                  {item.status}
                </span>
                {item.status === 'pending' && (
                  <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center">
                    Send Now <Send className="w-3 h-3 ml-1" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Mobile FAB */}
        <div className="md:hidden absolute bottom-6 right-6">
          <button className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Form View (Mock) */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden">
         <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-10 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 dark:text-white">Create Scheduled Message</h2>
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
         </header>

         <div className="flex-1 overflow-y-auto p-8 flex justify-center">
           <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl p-6">
             <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Select Recipient</label>
                  <div className="flex items-center p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
                      <Plus className="w-5 h-5" />
                    </div>
                    <span className="text-slate-500 font-medium">Choose contact or group...</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message Content</label>
                  <textarea 
                    rows={4}
                    className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-slate-800 dark:text-slate-200"
                    placeholder="Type the message you want to schedule..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Date</label>
                    <div className="relative">
                      <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="date" className="w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Time</label>
                    <div className="relative">
                      <Clock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="time" className="w-full pl-10 pr-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent text-sm" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input type="checkbox" id="recurring" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                  <label htmlFor="recurring" className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300">Make this a recurring message</label>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end space-x-3">
                  <button className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">Cancel</button>
                  <button className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-xl shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-colors flex items-center">
                    <Calendar className="w-4 h-4 mr-2" /> Schedule Message
                  </button>
                </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
