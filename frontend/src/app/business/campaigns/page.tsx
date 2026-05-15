"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  MoreVertical, 
  Megaphone,
  BarChart2,
  Users,
  Send,
  CalendarClock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function BusinessCampaignsPage() {
  const campaigns = [
    {
      id: "C001",
      name: "Summer Sale Announcement",
      status: "active",
      sent: 1250,
      delivered: 1245,
      read: 980,
      replied: 145,
      date: "Today, 09:00 AM"
    },
    {
      id: "C002",
      name: "New API Feature Update",
      status: "scheduled",
      sent: 0,
      delivered: 0,
      read: 0,
      replied: 0,
      date: "Tomorrow, 10:00 AM"
    },
    {
      id: "C003",
      name: "Premium Plan Discount",
      status: "completed",
      sent: 5000,
      delivered: 4980,
      read: 3200,
      replied: 450,
      date: "May 10, 2026"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>Active</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs font-bold rounded-full border border-blue-200 dark:border-blue-800 flex items-center"><CalendarClock className="w-3 h-3 mr-1" />Scheduled</span>;
      case 'completed':
        return <span className="px-2 py-0.5 bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Desktop / Full width for Mobile */}
      <div className="w-full md:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-4 flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/business" className="mr-3">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
              </Link>
              <h1 className="text-xl font-bold flex items-center">
                <Megaphone className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                Campaigns
              </h1>
            </div>
            <button className="hidden md:flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm shadow-indigo-600/20 transition-all">
              <Plus className="w-4 h-4 mr-2" /> New Campaign
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Messages Sent</p>
              <Send className="w-4 h-4 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">6,250</h3>
            <p className="text-[10px] text-green-500 font-medium mt-1">+12% this week</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Avg Read Rate</p>
              <BarChart2 className="w-4 h-4 text-indigo-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">78.5%</h3>
            <p className="text-[10px] text-green-500 font-medium mt-1">+2.4% this week</p>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20 md:pb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Recent Campaigns
            </h2>
            <Search className="w-5 h-5 text-slate-400 cursor-pointer hover:text-indigo-500 transition-colors" />
          </div>

          {campaigns.map((campaign) => (
            <div 
              key={campaign.id} 
              className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">{campaign.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
                    <CalendarClock className="w-3.5 h-3.5 mr-1" /> {campaign.date}
                  </p>
                </div>
                {getStatusBadge(campaign.status)}
              </div>
              
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Sent</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{campaign.sent.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Delivered</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{campaign.delivered.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Read</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{campaign.read.toLocaleString()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 font-medium uppercase">Replied</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 text-sm">{campaign.replied.toLocaleString()}</span>
                </div>
              </div>

              {campaign.status === "active" && (
                <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: '78%' }}></div>
                </div>
              )}
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

      {/* Desktop Detail View (Empty State / Mock) */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 text-slate-300 dark:text-slate-600">
            <Megaphone className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Broadcast Messaging</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8">
            Create rich, engaging broadcast campaigns to reach thousands of customers instantly. Track delivery and read receipts in real-time.
          </p>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center">
            <Plus className="w-5 h-5 mr-2" /> Start New Campaign
          </button>
        </div>
      </div>
    </div>
  );
}
