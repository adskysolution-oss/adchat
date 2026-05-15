"use client";

import { useState } from "react";
import { 
  Bot, 
  Plus, 
  Settings, 
  Play, 
  Save, 
  MousePointer2, 
  MessageSquare, 
  HelpCircle, 
  List, 
  UserCheck, 
  LogOut,
  ChevronLeft,
  Search,
  MoreVertical,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ChatbotPage() {
  const [view, setView] = useState("list"); // list or builder

  const flows = [
    { id: 1, name: "Lead Qualification Bot", status: "ACTIVE", interactions: "1,240", conversion: "15.4%", nodes: 12 },
    { id: 2, name: "FAQ Assistant", status: "ACTIVE", interactions: "5,800", conversion: "N/A", nodes: 25 },
    { id: 3, name: "Order Tracking Bot", status: "DRAFT", interactions: "0", conversion: "0%", nodes: 8 },
  ];

  if (view === "builder") {
    return <ChatbotBuilder onBack={() => setView("list")} />;
  }

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#0f172a] overflow-hidden">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-border dark:border-border-dark flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Bot className="text-indigo-600" /> AI Chatbot Flows
          </h1>
          <p className="text-sm text-foreground/40 font-medium">Build interactive conversational experiences</p>
        </div>
        <button 
          onClick={() => setView("builder")}
          className="h-11 px-6 premium-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create New Flow
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard icon={<Activity className="w-5 h-5" />} label="Total Bot Sessions" value="12,450" change="+18%" color="primary" />
          <StatCard icon={<UserCheck className="w-5 h-5" />} label="Avg. Resolution" value="84%" change="+5%" color="green" />
          <StatCard icon={<LogOut className="w-5 h-5" />} label="Handover Rate" value="12%" change="-2%" color="accent" />
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-border dark:border-border-dark shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border dark:border-border-dark flex items-center justify-between">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search flows..." 
                className="h-11 bg-slate-50 dark:bg-slate-800 border-border dark:border-border-dark border rounded-xl pl-12 pr-4 outline-none text-sm w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border dark:border-border-dark text-left bg-slate-50/50 dark:bg-slate-800/30">
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Flow Name</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Nodes</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Sessions</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-foreground/40">Success Rate</th>
                  <th className="px-8 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 dark:divide-border-dark/50">
                {flows.map((flow) => (
                  <tr key={flow.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                          <Bot className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-sm">{flow.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                        flow.status === "ACTIVE" ? "bg-green-500/10 text-green-500 border-green-500/20" : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                      )}>
                        {flow.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-bold text-sm">{flow.nodes}</td>
                    <td className="px-8 py-5 font-bold text-sm">{flow.interactions}</td>
                    <td className="px-8 py-5 font-bold text-sm">{flow.conversion}</td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setView("builder")}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
                        >
                          Edit Flow
                        </button>
                        <button className="p-2 text-foreground/20 hover:text-foreground transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
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

function ChatbotBuilder({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 flex flex-col bg-[#f1f5f9] dark:bg-slate-950 overflow-hidden relative">
      <header className="h-16 bg-white dark:bg-slate-900 border-b border-border dark:border-border-dark flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-bold">Lead Qualification Bot</h2>
          <span className="px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold rounded-md">Draft</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-9 px-4 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold flex items-center gap-2">
            <Play className="w-3 h-3" /> Test Bot
          </button>
          <button className="h-9 px-6 premium-gradient text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-primary/20">
            <Save className="w-3 h-3" /> Save & Activate
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Components */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-border dark:border-border-dark p-6 space-y-6 z-10">
           <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Nodes</label>
           <div className="space-y-2">
              <NodeItem icon={<MessageSquare className="w-4 h-4" />} label="Send Message" color="bg-indigo-500" />
              <NodeItem icon={<HelpCircle className="w-4 h-4" />} label="Ask Question" color="bg-blue-500" />
              <NodeItem icon={<List className="w-4 h-4" />} label="Buttons / Menu" color="bg-purple-500" />
              <NodeItem icon={<Activity className="w-4 h-4" />} label="Condition" color="bg-orange-500" />
              <NodeItem icon={<UserCheck className="w-4 h-4" />} label="Agent Handover" color="bg-red-500" />
           </div>
        </aside>

        {/* Canvas Area (Simplified) */}
        <div className="flex-1 relative overflow-hidden bg-dot-grid" style={{ backgroundSize: '24px 24px' }}>
           {/* Mock Nodes */}
           <div className="absolute top-20 left-40">
              <BuilderNode label="Start Trigger" type="TRIGGER" active />
              <div className="h-20 w-px bg-slate-300 dark:bg-slate-700 mx-auto" />
              <BuilderNode label="Send Welcome Message" type="MESSAGE" />
              <div className="h-20 w-px bg-slate-300 dark:bg-slate-700 mx-auto" />
              <BuilderNode label="Ask For Interest" type="QUESTION" />
           </div>

           <div className="absolute bottom-8 right-8 flex gap-2">
              <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-border">
                 <MousePointer2 className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-border">
                 <Settings className="w-5 h-5" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function NodeItem({ icon, label, color }: any) {
  return (
    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-border/50 cursor-grab active:cursor-grabbing hover:border-primary/30 transition-all">
       <div className={cn("p-2 rounded-lg text-white", color)}>{icon}</div>
       <span className="text-xs font-bold">{label}</span>
    </div>
  );
}

function BuilderNode({ label, type, active }: any) {
  return (
    <div className={cn(
      "w-56 p-4 bg-white dark:bg-slate-900 rounded-2xl border-2 shadow-xl relative",
      active ? "border-primary" : "border-border dark:border-border-dark"
    )}>
       <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40 mb-1">{type}</p>
       <p className="font-bold text-sm">{label}</p>
       <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-slate-900 border-2 border-border rounded-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
       </div>
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
          color === "accent" ? "bg-accent/10 text-accent" : "bg-green-500/10 text-green-500"
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
