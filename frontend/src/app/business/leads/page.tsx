"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  MoreVertical, 
  Filter,
  UserPlus,
  MessageSquare,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  Phone,
  Mail
} from "lucide-react";

// Types
type LeadStatus = "new" | "contacted" | "qualified" | "converted";

interface Lead {
  id: string;
  name: string;
  company: string;
  source: string;
  status: LeadStatus;
  date: string;
  value: string;
  avatar: string;
}

export default function BusinessLeadsPage() {
  const [activeTab, setActiveTab] = useState<LeadStatus | "all">("all");

  const leads: Lead[] = [
    { id: "L001", name: "Sarah Connor", company: "Cyberdyne Sys", source: "Website", status: "new", date: "Today", value: "$5,000", avatar: "https://i.pravatar.cc/150?u=sarah" },
    { id: "L002", name: "John Smith", company: "Matrix Inc", source: "Referral", status: "contacted", date: "Yesterday", value: "$1,200", avatar: "https://i.pravatar.cc/150?u=john" },
    { id: "L003", name: "Bruce Wayne", company: "Wayne Ent", source: "Campaign", status: "qualified", date: "2 days ago", value: "$15,000", avatar: "https://i.pravatar.cc/150?u=bruce" },
    { id: "L004", name: "Clark Kent", company: "Daily Planet", source: "Organic", status: "converted", date: "Last week", value: "$800", avatar: "https://i.pravatar.cc/150?u=clark" },
    { id: "L005", name: "Diana Prince", company: "Themyscira LLC", source: "Website", status: "new", date: "Today", value: "$3,400", avatar: "https://i.pravatar.cc/150?u=diana" },
    { id: "L006", name: "Tony Stark", company: "Stark Ind", source: "Campaign", status: "qualified", date: "Yesterday", value: "$25,000", avatar: "https://i.pravatar.cc/150?u=tony" },
  ];

  const filteredLeads = activeTab === "all" ? leads : leads.filter(l => l.status === activeTab);

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "qualified": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "converted": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
    }
  };

  const getStatusIcon = (status: LeadStatus) => {
    switch (status) {
      case "new": return <UserPlus className="w-3.5 h-3.5 mr-1" />;
      case "contacted": return <MessageSquare className="w-3.5 h-3.5 mr-1" />;
      case "qualified": return <Clock className="w-3.5 h-3.5 mr-1" />;
      case "converted": return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
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
              <Link href="/business" className="mr-3">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
              </Link>
              <h1 className="text-xl font-bold flex items-center">
                Lead Pipeline
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors md:hidden">
                <MoreVertical className="w-5 h-5" />
              </button>
              <button className="hidden md:flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Lead
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search leads, companies..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 text-sm outline-none transition-shadow"
            />
          </div>

          {/* Pipeline Stages Tabs */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {["all", "new", "contacted", "qualified", "converted"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${
                  activeTab === tab 
                    ? "bg-slate-800 text-white dark:bg-white dark:text-slate-900 shadow-sm" 
                    : "bg-white text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tab} {tab !== "all" && `(${leads.filter(l => l.status === tab).length})`}
              </button>
            ))}
          </div>
        </header>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-20 md:pb-4">
          {filteredLeads.map((lead) => (
            <div 
              key={lead.id} 
              className="p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-700 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center">
                  <img src={lead.avatar} alt={lead.name} className="w-10 h-10 rounded-full object-cover mr-3 border border-slate-200 dark:border-slate-700" />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{lead.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{lead.company}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border flex items-center ${getStatusColor(lead.status)}`}>
                  {getStatusIcon(lead.status)}
                  {lead.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex space-x-4 text-xs">
                  <div className="flex flex-col">
                    <span className="text-slate-400 mb-0.5">Value</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{lead.value}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-400 mb-0.5">Source</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{lead.source}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-400 font-medium">{lead.date}</p>
              </div>
            </div>
          ))}
          
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">No leads found</h3>
              <p className="text-xs text-slate-500 max-w-[200px]">There are no leads matching the current filter criteria.</p>
            </div>
          )}
        </div>
        
        {/* Mobile FAB */}
        <div className="md:hidden absolute bottom-6 right-6">
          <button className="w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/30 transition-transform active:scale-95">
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Desktop Lead Detail View (Empty State / Mock) */}
      <div className="hidden md:flex flex-1 flex-col bg-slate-50 dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-md border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 text-slate-300 dark:text-slate-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Select a Lead</h2>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6">
            Click on a lead from the list to view full details, activity history, and communication options.
          </p>
          <div className="flex space-x-3">
             <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium rounded-lg transition-colors flex items-center shadow-sm">
              <Download className="w-4 h-4 mr-2" /> Export
            </button>
            <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md shadow-indigo-600/20 transition-all flex items-center">
              <Plus className="w-4 h-4 mr-2" /> Create Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Icon Component
function Download(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
  );
}
