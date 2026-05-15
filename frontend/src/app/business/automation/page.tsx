"use client";

import { useState } from "react";
import { 
  Zap, 
  Plus, 
  MoreVertical, 
  MessageSquare, 
  Clock, 
  Phone, 
  UserPlus, 
  ArrowRight,
  Bot,
  Hash,
  ChevronRight,
  Settings2,
  Play,
  Pause
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AutomationPage() {
  const [activeTab, setActiveTab] = useState("rules");

  const rules = [
    { id: 1, name: "New Lead Welcome", trigger: "NEW_LEAD", action: "Send Welcome Template", status: "ACTIVE", icon: <UserPlus className="w-5 h-5" /> },
    { id: 2, name: "Keyword: 'Price'", trigger: "KEYWORD", action: "Send Catalog Link", status: "ACTIVE", icon: <Hash className="w-5 h-5" /> },
    { id: 3, name: "Away Message", trigger: "OUT_OF_HOURS", action: "Send Away Template", status: "ACTIVE", icon: <Clock className="w-5 h-5" /> },
    { id: 4, name: "Missed Call Reply", trigger: "MISSED_CALL", action: "Send Callback Link", status: "PAUSED", icon: <Phone className="w-5 h-5" /> },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#0f172a] overflow-hidden">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-border dark:border-border-dark flex items-center justify-between px-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-3">
            <Zap className="text-yellow-500 fill-yellow-500" /> Smart Automation
          </h1>
          <p className="text-sm text-foreground/40 font-medium">Auto-respond to customers and streamline workflows</p>
        </div>
        <button className="h-11 px-6 premium-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2">
          <Plus className="w-4 h-4" /> New Automation
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        <div className="flex gap-2 p-1 bg-white dark:bg-slate-900 border border-border dark:border-border-dark rounded-2xl w-fit shadow-sm">
          {["Rules", "Triggers", "History", "Settings"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                activeTab === tab.toLowerCase() ? "bg-slate-100 dark:bg-slate-800 text-primary shadow-inner" : "text-foreground/40 hover:text-foreground/60"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {rules.map((rule) => (
            <motion.div 
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-border dark:border-border-dark shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
                    rule.status === "ACTIVE" ? "bg-primary/10 text-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                  )}>
                    {rule.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{rule.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        "w-2 h-2 rounded-full",
                        rule.status === "ACTIVE" ? "bg-green-500 animate-pulse" : "bg-slate-400"
                      )} />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">{rule.status}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      {rule.status === "ACTIVE" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                   </button>
                   <button className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      <Settings2 className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-2">When</p>
                  <p className="font-bold text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" /> {rule.trigger.replace('_', ' ')}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-foreground/20" />
                <div className="flex-1 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-2">Then</p>
                  <p className="font-bold text-sm flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-primary" /> {rule.action}
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border dark:border-border-dark flex justify-between items-center">
                <div className="flex items-center gap-6">
                   <div>
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Triggered</p>
                      <p className="font-bold">1,248</p>
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">Success</p>
                      <p className="font-bold text-green-500">99.2%</p>
                   </div>
                </div>
                <button className="text-primary text-xs font-bold hover:underline flex items-center gap-1">
                   View Logs <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
          
          <button className="group p-8 rounded-[2.5rem] border-2 border-dashed border-border dark:border-border-dark hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-4 min-h-[350px]">
            <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus className="w-10 h-10 text-foreground/20 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">Add New Automation Rule</p>
              <p className="text-sm text-foreground/40 max-w-xs">Define a trigger and an action to automate your business communication.</p>
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
