"use client";

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  AlertTriangle, 
  Server, 
  Database, 
  Activity, 
  Key,
  CreditCard,
  History,
  FileText,
  Search,
  Bell,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Admin Sidebar */}
      <aside className="w-72 hidden xl:flex flex-col border-r border-slate-800 bg-slate-950 z-30">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Sky <span className="text-indigo-400">Admin</span></span>
          </div>

          <nav className="space-y-1">
            <AdminSidebarItem icon={<Activity className="w-5 h-5" />} label="Overview" active />
            <AdminSidebarItem icon={<Users className="w-5 h-5" />} label="User Management" />
            <AdminSidebarItem icon={<Building2 className="w-5 h-5" />} label="Business Accounts" badge="42" />
            <AdminSidebarItem icon={<AlertTriangle className="w-5 h-5" />} label="Moderation Queue" badge="12" badgeColor="bg-red-500" />
            <AdminSidebarItem icon={<Key className="w-5 h-5" />} label="API Management" />
            <AdminSidebarItem icon={<CreditCard className="w-5 h-5" />} label="Subscriptions" />
            <AdminSidebarItem icon={<Server className="w-5 h-5" />} label="Infrastructure" />
            <AdminSidebarItem icon={<History className="w-5 h-5" />} label="Audit Logs" />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-slate-800">
          <div className="flex items-center gap-4 p-3 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">SA</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">Super Admin</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Level 10 Access</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-20">
          <h2 className="text-xl font-bold text-white">System Command Center</h2>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 px-4 py-2 bg-slate-900 rounded-full border border-slate-800 text-xs font-bold">
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                API: Operational
              </div>
              <div className="w-px h-4 bg-slate-800" />
              <div className="flex items-center gap-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                DB: Healthy
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-all relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-slate-900" />
              </button>
            </div>
          </div>
        </header>

        {/* Admin Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-950 to-slate-950">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AdminStatCard icon={<Users />} label="Active Users" value="842.1k" change="+14.2%" trend="up" color="indigo" />
            <AdminStatCard icon={<Database />} label="Data Usage" value="4.2 PB" change="+8.1%" trend="up" color="purple" />
            <AdminStatCard icon={<Activity />} label="Requests/sec" value="12.4k" change="-2.4%" trend="down" color="pink" />
            <AdminStatCard icon={<ShieldCheck />} label="Security Score" value="98.4" change="+0.5%" trend="up" color="blue" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* System Health */}
            <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-400" /> Infrastructure Status
                </h3>
                <button className="text-[10px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors">Details</button>
              </div>

              <div className="space-y-4">
                <HealthBar label="Web Servers (US-East)" value={84} status="healthy" />
                <HealthBar label="WebSocket Clusters" value={92} status="healthy" />
                <HealthBar label="Media Storage (S3 Proxy)" value={45} status="warning" />
                <HealthBar label="Auth Gateway" value={99} status="healthy" />
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Latency</p>
                  <p className="text-xl font-bold text-white">24ms</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Uptime</p>
                  <p className="text-xl font-bold text-white">99.98%</p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Errors</p>
                  <p className="text-xl font-bold text-white">0.02%</p>
                </div>
              </div>
            </div>

            {/* Verification Requests */}
            <div className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden">
              <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400" /> Pending Business Verification
                </h3>
                <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 text-[10px] font-black rounded-lg border border-indigo-500/20">12 NEW</span>
              </div>
              <div className="divide-y divide-slate-800">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
                        B{i}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">Global Retail Corp {i}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] font-bold text-slate-500">Retail</span>
                          <div className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span className="text-[10px] font-bold text-indigo-400">Documents Submitted</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all border border-green-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all border border-red-500/20">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-800 text-slate-400 rounded-lg hover:text-white transition-all">
                        <FileText className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function AdminSidebarItem({ icon, label, active = false, badge, badgeColor = "bg-indigo-500" }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string, badgeColor?: string }) {
  return (
    <button className={cn(
      "w-full flex items-center justify-between p-3.5 rounded-xl transition-all group",
      active 
        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-[0_0_15px_rgba(79,70,229,0.1)]" 
        : "text-slate-500 hover:text-slate-200 hover:bg-slate-900"
    )}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-bold">{label}</span>
      </div>
      {badge && (
        <span className={cn(
          "px-2 py-0.5 rounded text-[10px] font-black text-white",
          badgeColor
        )}>
          {badge}
        </span>
      )}
    </button>
  );
}

function AdminStatCard({ icon, label, value, change, trend, color }: { icon: React.ReactNode, label: string, value: string, change: string, trend: "up" | "down", color: string }) {
  return (
    <div className="p-6 bg-slate-900/50 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-2xl group-hover:scale-110 transition-transform bg-slate-800 border border-slate-700",
          `text-${color}-400`
        )}>
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
          trend === "up" ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          {change}
        </div>
      </div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-black text-white">{value}</h4>
    </div>
  );
}

function HealthBar({ label, value, status }: { label: string, value: number, status: "healthy" | "warning" | "error" }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
        <span className="text-slate-400">{label}</span>
        <span className={status === "healthy" ? "text-green-400" : "text-amber-400"}>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={cn(
            "h-full rounded-full",
            status === "healthy" ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" : "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
          )}
        />
      </div>
    </div>
  );
}
