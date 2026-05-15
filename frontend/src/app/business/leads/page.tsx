"use client";

import React, { useState, useEffect } from "react";
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
  Mail,
  Calendar,
  Tag,
  History,
  FileText,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types
type LeadStatus = "NEW" | "CONTACTED" | "INTERESTED" | "FOLLOW_UP" | "QUALIFIED" | "CONVERTED" | "LOST" | "REJECTED";

export default function BusinessLeadsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<LeadStatus | "ALL">("ALL");
  const [selectedLead, setSelectedLead] = useState<any | null>(null);
  const [leadHistory, setLeadHistory] = useState<any[]>([]);

  useEffect(() => {
    fetchLeads();
  }, [activeTab]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const businessId = 'demo-business-id'; // Placeholder
      const statusParam = activeTab !== "ALL" ? `?status=${activeTab}` : '';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/crm/leads/${businessId}${statusParam}`);
      const data = await res.json();
      setLeads(data);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeadDetails = async (leadId: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/crm/leads/${leadId}/history`);
      const data = await res.json();
      setSelectedLead(data);
      setLeadHistory(data.timeline || []);
    } catch (error) {
      console.error("Failed to fetch lead details", error);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/crm/leads/${leadId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchLeads();
        if (selectedLead?.id === leadId) fetchLeadDetails(leadId);
      }
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case "NEW": return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "CONTACTED": return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800";
      case "QUALIFIED": return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200 dark:border-purple-800";
      case "CONVERTED": return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800";
      case "LOST":
      case "REJECTED": return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800";
      default: return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700";
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* Sidebar / List View */}
      <div className={cn(
        "w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all",
        selectedLead && "hidden lg:flex"
      )}>
        
        {/* Header */}
        <header className="px-4 py-4 flex flex-col gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/business" className="mr-3">
                <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
              </Link>
              <h1 className="text-xl font-bold">Lead Pipeline</h1>
            </div>
            <button className="flex items-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
              <Plus className="w-4 h-4 mr-1" /> Add
            </button>
          </div>

          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {["ALL", "NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all border",
                  activeTab === tab 
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md" 
                    : "bg-white text-slate-600 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700 hover:bg-slate-50"
                )}
              >
                {tab.toLowerCase()}
              </button>
            ))}
          </div>
        </header>

        {/* Leads List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
          ) : leads.map((lead) => (
            <div 
              key={lead.id} 
              onClick={() => fetchLeadDetails(lead.id)}
              className={cn(
                "p-4 rounded-2xl border transition-all cursor-pointer group",
                selectedLead?.id === lead.id 
                  ? "bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-300 dark:border-indigo-700" 
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">{lead.name}</h3>
                  <p className="text-xs text-slate-500">{lead.company || lead.phoneNumber}</p>
                </div>
                <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", getStatusColor(lead.status))}>
                  {lead.status}
                </span>
              </div>
              <div className="flex items-center justify-between mt-3 text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                <span>Value: ${lead.value || 0}</span>
                <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Detail View */}
      <div className={cn(
        "flex-1 flex flex-col bg-white dark:bg-slate-950 overflow-hidden",
        !selectedLead && "hidden md:flex"
      )}>
        {!selectedLead ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">Select a lead to view details</h2>
            <p className="text-slate-500 max-w-xs">Full history and communication tools will appear here.</p>
          </div>
        ) : (
          <>
            <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-950">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedLead(null)} className="lg:hidden">
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl">
                  {selectedLead.name[0]}
                </div>
                <div>
                  <h2 className="text-lg font-bold">{selectedLead.name}</h2>
                  <p className="text-sm text-slate-500">{selectedLead.company || 'Private Lead'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><Phone className="w-5 h-5 text-green-600" /></button>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><Mail className="w-5 h-5 text-indigo-600" /></button>
                <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><MessageSquare className="w-5 h-5 text-blue-600" /></button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <div className="p-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Info Card */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Lead Information
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                        <select 
                          value={selectedLead.status}
                          onChange={(e) => updateLeadStatus(selectedLead.id, e.target.value as LeadStatus)}
                          className="mt-1 block w-full bg-transparent border-none p-0 font-bold text-indigo-600 focus:ring-0 cursor-pointer"
                        >
                          {["NEW", "CONTACTED", "QUALIFIED", "CONVERTED", "LOST", "REJECTED"].map(s => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Value</label>
                        <p className="mt-1 font-bold text-lg">${selectedLead.value || 0}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Source</label>
                        <p className="mt-1 font-medium">{selectedLead.source}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Requirement</label>
                        <p className="mt-1 font-medium">{selectedLead.requirement || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <h3 className="font-bold flex items-center gap-2 text-sm">
                        <History className="w-4 h-4" /> Activity History
                      </h3>
                    </div>
                    <div className="p-4 space-y-6 relative before:content-[''] before:absolute before:left-7 before:top-8 before:bottom-8 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
                      {leadHistory.map((item, i) => (
                        <div key={item.id} className="flex gap-4 relative">
                          <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                            item.action === 'CREATED' ? "bg-green-500" : "bg-indigo-500"
                          )}>
                            <div className="w-2 h-2 bg-white rounded-full" />
                          </div>
                          <div>
                            <p className="text-sm font-bold">{item.action}</p>
                            <p className="text-xs text-slate-500">{item.details}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{new Date(item.createdAt).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Card */}
                <div className="space-y-6">
                  <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-600/20">
                    <h3 className="text-xs font-bold uppercase mb-4 opacity-80">Next Follow-up</h3>
                    {selectedLead.followUpDate ? (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-8 h-8" />
                        <div>
                          <p className="text-xl font-bold">{new Date(selectedLead.followUpDate).toLocaleDateString()}</p>
                          <p className="text-xs opacity-70">10:00 AM</p>
                        </div>
                      </div>
                    ) : (
                      <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-sm transition-colors">
                        Set Reminder
                      </button>
                    )}
                  </div>

                  <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase mb-4 text-slate-400">Assigned Agent</h3>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                      <div className="w-8 h-8 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold">
                        {selectedLead.assignedTo?.firstName?.[0] || '?'}
                      </div>
                      <p className="text-sm font-bold">
                        {selectedLead.assignedTo ? `${selectedLead.assignedTo.firstName} ${selectedLead.assignedTo.lastName}` : 'Unassigned'}
                      </p>
                    </div>
                    <button className="w-full mt-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                      Change Agent
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
