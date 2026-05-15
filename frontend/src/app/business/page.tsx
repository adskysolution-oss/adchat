"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  MessageSquareText, 
  Send, 
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  TrendingUp,
  Clock,
  MoreHorizontal,
  Plus,
  Zap,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";

const STATS = [
  { label: "Total Leads", value: "1,284", change: "+12.5%", trending: "up", color: "primary" },
  { label: "Active Orders", value: "48", change: "+5.2%", trending: "up", color: "secondary" },
  { label: "Catalog Views", value: "12.4k", change: "-2.1%", trending: "down", color: "accent" },
  { label: "Avg. Response", value: "4.2m", change: "-15%", trending: "up", color: "green" }
];

export default function BusinessDashboard() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-[#f8fafc] dark:bg-[#0f172a]">
      {/* Desktop Sidebar */}
      <aside className="w-72 hidden lg:flex flex-col border-r border-border dark:border-border-dark bg-white dark:bg-slate-900 z-30">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 premium-gradient rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-gradient">Sky Business</span>
          </div>

          <nav className="space-y-1.5">
            <SidebarItem icon={<LayoutDashboard />} label="Dashboard" href="/business" active={pathname === '/business'} />
            <SidebarItem icon={<MessageSquareText />} label="Inbox" href="/business/chat" badge={5} active={pathname === '/business/chat'} />
            <SidebarItem icon={<Users />} label="Leads / CRM" href="/business/leads" active={pathname === '/business/leads'} />
            <SidebarItem icon={<ShoppingBag />} label="Catalog" href="/business/products" active={pathname === '/business/products'} />
            <SidebarItem icon={<Send />} label="Campaigns" href="/business/campaigns" active={pathname === '/business/campaigns'} />
            <SidebarItem icon={<Zap />} label="Automation" href="/business/automation" active={pathname === '/business/automation'} />
            <SidebarItem icon={<Bot />} label="Chatbot" href="/business/chatbot" active={pathname === '/business/chatbot'} />
            <SidebarItem icon={<BarChart3 />} label="Reports" href="/business/reports" active={pathname === '/business/reports'} />
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-border dark:border-border-dark">
          <nav className="space-y-1.5">
            <SidebarItem icon={<Settings />} label="Settings" href="/business/settings" active={pathname === '/business/settings'} />
            <div className="flex items-center gap-3 p-3 mt-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Biz" className="w-10 h-10 rounded-xl bg-white" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Premium Store</p>
                <p className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">Business Pro</p>
              </div>
            </div>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border dark:border-border-dark flex items-center justify-between px-8 z-20">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-full max-w-md group hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search leads, products, orders..." 
                className="w-full h-11 bg-slate-100 dark:bg-slate-800 border-transparent focus:bg-white dark:focus:bg-slate-950 border focus:border-primary/20 rounded-xl pl-12 pr-4 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5 text-foreground/60" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800" />
            </button>
            <Link href="/business/campaigns/new" className="hidden sm:flex items-center gap-2 h-11 px-5 premium-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
              <Plus className="w-4 h-4" /> New Campaign
            </Link>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Welcome back, Sky Admin</h2>
              <p className="text-foreground/50 font-medium">Here's what's happening with your business today.</p>
            </div>
            <div className="flex gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-border dark:border-border-dark shadow-sm">
              <button className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-lg shadow-md">Today</button>
              <button className="px-4 py-1.5 text-foreground/50 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">7 Days</button>
              <button className="px-4 py-1.5 text-foreground/50 text-xs font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">30 Days</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-border dark:border-border-dark shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={cn(
                    "p-3 rounded-2xl group-hover:scale-110 transition-transform",
                    stat.color === "primary" ? "bg-primary/10 text-primary" :
                    stat.color === "secondary" ? "bg-secondary/10 text-secondary" :
                    stat.color === "accent" ? "bg-accent/10 text-accent" : "bg-green-500/10 text-green-500"
                  )}>
                    {stat.color === "primary" ? <Users className="w-5 h-5" /> :
                     stat.color === "secondary" ? <ShoppingBag className="w-5 h-5" /> :
                     stat.color === "accent" ? <BarChart3 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg",
                    stat.trending === "up" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {stat.trending === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground/50 mb-1">{stat.label}</p>
                <h4 className="text-2xl font-bold text-foreground">{stat.value}</h4>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Recent Leads */}
            <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-border dark:border-border-dark shadow-sm overflow-hidden">
              <div className="p-6 border-b border-border dark:border-border-dark flex justify-between items-center">
                <h3 className="font-bold text-lg">Recent Leads & Inquiries</h3>
                <Link href="/business/leads" className="text-primary text-xs font-bold hover:underline">View All</Link>
              </div>
              <div className="divide-y divide-border/50 dark:divide-border-dark/50">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Lead${item}`} className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800" />
                        <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Customer Name {item}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold rounded-md text-foreground/40 uppercase">Interested</span>
                          <span className="text-[10px] text-foreground/30 font-medium">2 hours ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href="/business/chat" className="p-2 text-foreground/40 hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                        <MessageSquareText className="w-4 h-4" />
                      </Link>
                      <button className="p-2 text-foreground/40 hover:text-foreground/80 transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Campaign Performance */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-border dark:border-border-dark shadow-sm p-6 space-y-6">
              <h3 className="font-bold text-lg">Active Campaigns</h3>
              <div className="space-y-4">
                {[
                  { name: "Summer Sale 2026", reach: "4.2k", conversion: "8.4%", color: "primary" },
                  { name: "Flash Offer - Shoes", reach: "1.8k", conversion: "12.1%", color: "secondary" },
                  { name: "New Arrival Blast", reach: "9.5k", conversion: "3.2%", color: "accent" }
                ].map((camp, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm">{camp.name}</h4>
                      <div className={cn(
                        "w-2 h-2 rounded-full animate-pulse",
                        camp.color === "primary" ? "bg-primary" : camp.color === "secondary" ? "bg-secondary" : "bg-accent"
                      )} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] text-foreground/40 font-bold uppercase mb-0.5">Total Reach</p>
                        <p className="font-bold text-sm">{camp.reach}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-foreground/40 font-bold uppercase mb-0.5">Conversion</p>
                        <p className="font-bold text-sm">{camp.conversion}</p>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: camp.conversion }}
                        className={cn(
                          "h-full rounded-full",
                          camp.color === "primary" ? "bg-primary" : camp.color === "secondary" ? "bg-secondary" : "bg-accent"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/business/campaigns" className="w-full py-3 bg-slate-100 dark:bg-slate-800 text-foreground/60 text-xs font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-center block">
                View All Campaigns
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, href = "#", active = false, badge }: { icon: React.ReactNode, label: string, href?: string, active?: boolean, badge?: number }) {
  return (
    <Link 
      href={href}
      className={cn(
        "w-full flex items-center justify-between p-3.5 rounded-2xl transition-all duration-300 group relative",
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]" 
          : "text-foreground/50 hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-5 h-5 transition-colors",
          active ? "text-white" : "text-foreground/40 group-hover:text-primary"
        )}>
          {icon}
        </div>
        <span className="text-sm font-bold tracking-tight">{label}</span>
      </div>
      {badge && (
        <span className={cn(
          "px-2 py-0.5 rounded-lg text-[10px] font-black",
          active ? "bg-white text-primary" : "bg-primary text-white"
        )}>
          {badge}
        </span>
      )}
      {active && (
        <motion.div 
          layoutId="sidebar-indicator"
          className="w-1.5 h-6 bg-white rounded-full absolute -right-2" 
        />
      )}
    </Link>
  );
}
