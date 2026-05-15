"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  MessageSquare, 
  FileText, 
  Image as ImageIcon, 
  Video, 
  CheckCircle,
  Clock,
  ChevronRight,
  Layout,
  Type,
  ExternalLink,
  Phone
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TemplatesPage() {
  const [showNewModal, setShowNewModal] = useState(false);

  const templates = [
    { id: 1, name: "Welcome Message", category: "MARKETING", status: "APPROVED", lastUsed: "2 hours ago" },
    { id: 2, name: "Order Confirmation", category: "UTILITY", status: "APPROVED", lastUsed: "10 mins ago" },
    { id: 3, name: "Abandoned Cart", category: "MARKETING", status: "PENDING", lastUsed: "Never" },
    { id: 4, name: "Flash Sale Alert", category: "MARKETING", status: "REJECTED", lastUsed: "Never" },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f8fafc] dark:bg-[#0f172a] overflow-hidden">
      <header className="h-20 bg-white dark:bg-slate-900 border-b border-border dark:border-border-dark flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <Link href="/business/campaigns" className="p-2 -ml-2 text-foreground/40 hover:text-primary transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Message Templates</h1>
            <p className="text-sm text-foreground/40 font-medium">Create and manage your reusable message formats</p>
          </div>
        </div>
        <button 
          onClick={() => setShowNewModal(true)}
          className="h-11 px-6 premium-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Template
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {templates.map((tpl) => (
            <motion.div 
              key={tpl.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border border-border dark:border-border-dark shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <button className="p-2 text-foreground/20 hover:text-foreground transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center",
                  tpl.category === "MARKETING" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
                )}>
                  <Layout className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{tpl.name}</h3>
                  <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{tpl.category}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-foreground/60 leading-relaxed line-clamp-3 italic">
                    "Hello {"{{customer_name}}"}. We have an amazing offer just for you! Use code SALE20 to get 20% off on your next order."
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Quick Reply
                  </div>
                  <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                    Visit Site
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border dark:border-border-dark">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-2 h-2 rounded-full",
                      tpl.status === "APPROVED" ? "bg-green-500" : tpl.status === "PENDING" ? "bg-yellow-500" : "bg-red-500"
                    )} />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">{tpl.status}</span>
                  </div>
                  <span className="text-[10px] font-bold text-foreground/30">Last used: {tpl.lastUsed}</span>
                </div>
              </div>
            </motion.div>
          ))}
          
          <button 
            onClick={() => setShowNewModal(true)}
            className="group p-6 rounded-[2.5rem] border-2 border-dashed border-border dark:border-border-dark hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-4 min-h-[300px]"
          >
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <Plus className="w-8 h-8 text-foreground/20 group-hover:text-primary transition-colors" />
            </div>
            <div className="text-center">
              <p className="font-bold">Add New Template</p>
              <p className="text-xs text-foreground/40">Create a reusable message format</p>
            </div>
          </button>
        </div>
      </main>

      {/* Modal Placeholder */}
      <AnimatePresence>
        {showNewModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
             <motion.div 
               initial={{ scale: 0.9, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               exit={{ scale: 0.9, opacity: 0 }}
               className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border border-border dark:border-border-dark flex flex-col max-h-[90vh]"
             >
                <div className="p-8 border-b border-border dark:border-border-dark flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                  <h2 className="text-2xl font-bold">New Message Template</h2>
                  <button onClick={() => setShowNewModal(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                    <ChevronRight className="w-6 h-6 rotate-90" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 flex flex-col lg:flex-row gap-12 no-scrollbar">
                  {/* Form */}
                  <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Template Details</label>
                      <input type="text" placeholder="Template Name (e.g., Summer_Sale_Invite)" className="w-full h-14 bg-slate-100 dark:bg-slate-800 border-transparent border focus:bg-white dark:focus:bg-slate-950 focus:border-primary/20 rounded-2xl px-6 outline-none transition-all font-bold" />
                      <select className="w-full h-14 bg-slate-100 dark:bg-slate-800 border-transparent border focus:bg-white dark:focus:bg-slate-950 focus:border-primary/20 rounded-2xl px-6 outline-none transition-all font-bold">
                        <option>Marketing</option>
                        <option>Utility</option>
                        <option>Authentication</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Header (Optional)</label>
                      <div className="flex gap-2">
                        {['None', 'Text', 'Image', 'Video', 'Document'].map(type => (
                          <button key={type} className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Body Text</label>
                      <textarea 
                        rows={5} 
                        placeholder="Write your message here... Use {{1}}, {{2}} for variables." 
                        className="w-full bg-slate-100 dark:bg-slate-800 border-transparent border focus:bg-white dark:focus:bg-slate-950 focus:border-primary/20 rounded-3xl p-6 outline-none transition-all font-medium text-sm leading-relaxed"
                      />
                    </div>

                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Interactive Buttons</label>
                      <div className="space-y-2">
                        <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl flex items-center justify-center gap-2 text-foreground/40 hover:text-primary hover:border-primary/50 transition-all font-bold text-sm">
                          <Plus className="w-4 h-4" /> Add Button
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="w-full lg:w-[350px] space-y-6">
                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 px-2">Live Preview</label>
                    <div className="bg-slate-100 dark:bg-slate-950 p-6 rounded-[3rem] border border-border dark:border-border-dark aspect-[9/16] relative shadow-inner">
                       <div className="absolute top-12 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-200 dark:bg-slate-800 rounded-full" />
                       <div className="mt-20 space-y-4">
                          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none shadow-sm border border-border/50">
                            <div className="w-full aspect-video bg-slate-100 dark:bg-slate-800 rounded-xl mb-3 flex items-center justify-center">
                              <ImageIcon className="w-8 h-8 text-foreground/10" />
                            </div>
                            <p className="text-xs text-foreground/80 leading-relaxed mb-3">
                              Hello <span className="text-primary font-bold">{"{{customer_name}}"}</span>. We have an amazing offer just for you!
                            </p>
                            <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                               <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-primary flex items-center justify-center gap-2">
                                 <ExternalLink className="w-3 h-3" /> Visit Website
                               </button>
                               <button className="w-full py-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-[10px] font-bold text-primary flex items-center justify-center gap-2">
                                 <Phone className="w-3 h-3" /> Call Us
                               </button>
                            </div>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-border dark:border-border-dark flex justify-end gap-4">
                  <button onClick={() => setShowNewModal(false)} className="h-14 px-8 rounded-2xl font-bold text-sm text-foreground/40 hover:text-foreground transition-all">Cancel</button>
                  <button className="h-14 px-10 premium-gradient text-white rounded-2xl font-bold text-sm shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all">Submit for Approval</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
