"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Send, 
  Search, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState("all");

  const campaigns = [
    { id: 1, name: "Summer Mega Sale", type: "IMAGE", status: "RUNNING", reach: 4500, read: 3200, replies: 120, date: "Today" },
    { id: 2, name: "New Arrival Blast", type: "VIDEO", status: "SCHEDULED", reach: 0, read: 0, replies: 0, date: "Tomorrow, 10:00 AM" },
    { id: 3, name: "Product Catalog Update", type: "PRODUCT", status: "COMPLETED", reach: 12400, read: 9800, replies: 450, date: "2 days ago" },
    { id: 4, name: "Flash Offer - Weekend", type: "TEXT", status: "FAILED", reach: 120, read: 50, replies: 5, date: "3 days ago" },
    { id: 5, name: "Customer Reactivation", type: "OFFER", status: "PAUSED", reach: 800, read: 400, replies: 20, date: "1 week ago" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RUNNING": return "bg-green-500/10 text-green-500 border-green-500/20";
      case "SCHEDULED": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "COMPLETED": return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "FAILED": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "PAUSED": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      default: return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#0f172a] overflow-hidden">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-border dark:border-border-dark flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold">Campaign Manager</h1>
          <p className="text-sm text-foreground/40 font-medium">Broadcast messages and track performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Link 
            href="/business/campaigns/templates" 
            className="h-11 px-6 rounded-xl border border-border dark:border-border-dark font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            Manage Templates
          </Link>
          <Link 
            href="/business/campaigns/new" 
            className="h-11 px-6 premium-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create Campaign
          </Link>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard icon={<Send className="w-5 h-5" />} label="Total Sent" value="128.4k" change="+12%" color="primary" />
          <StatCard icon={<Eye className="w-5 h-5" />} label="Avg. Read Rate" value="76.4%" change="+5.2%" color="secondary" />
          <StatCard icon={<MessageCircle className="w-5 h-5" />} label="Reply Rate" value="4.8%" change="+2.1%" color="accent" />
          <StatCard icon={<Users className="w-5 h-5" />} label="Opt-outs" value="0.2%" change="-15%" color="red" />
        </div>

        {/* Campaign List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border dark:border-border-dark flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
              {["All", "Running", "Scheduled", "Completed"].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={cn(
                    "px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activeTab === tab.toLowerCase() ? "bg-white dark:bg-slate-700 shadow-sm text-primary" : "text-foreground/40 hover:text-foreground/60"
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="h-11 bg-slate-50 dark:bg-slate-800 border-border dark:border-border-dark border rounded-xl pl-12 pr-4 outline-none text-sm w-full md:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-border-dark text-left bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Campaign Name</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Reach</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Read Rate</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Replies</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Date</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border-dark/50">
                {campaigns.map((camp) => (
                  <tr key={camp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary">
                          {camp.type === "IMAGE" ? <Send className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{camp.name}</p>
                          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{camp.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                        getStatusColor(camp.status)
                      )}>
                        {camp.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-sm">
                      {camp.reach.toLocaleString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{camp.reach > 0 ? Math.round((camp.read / camp.reach) * 100) : 0}%</span>
                        <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                           <div 
                            className="h-full bg-primary" 
                            style={{ width: `${camp.reach > 0 ? (camp.read / camp.reach) * 100 : 0}%` }} 
                           />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-bold text-sm">
                      {camp.replies}
                    </td>
                    <td className="px-8 py-5 text-sm text-foreground/40 font-medium">
                      {camp.date}
                    </td>
                    <td className="px-8 py-5">
                      <button className="p-2 text-foreground/40 hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value, change, color }: any) {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-[2rem] border border-border dark:border-border-dark shadow-sm group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-2xl group-hover:scale-110 transition-transform",
          color === "primary" ? "bg-primary/10 text-primary" :
          color === "secondary" ? "bg-secondary/10 text-secondary" :
          color === "accent" ? "bg-accent/10 text-accent" : "bg-red-500/10 text-red-500"
        )}>
          {icon}
        </div>
        <span className={cn(
          "text-[10px] font-bold px-2 py-1 rounded-lg bg-green-500/10 text-green-500"
        )}>
          {change}
        </span>
      </div>
      <p className="text-sm font-medium text-foreground/50 mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-foreground">{value}</h4>
    </div>
  );
}
