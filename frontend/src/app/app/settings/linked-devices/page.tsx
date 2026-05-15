"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Monitor, 
  Laptop, 
  Plus, 
  MoreVertical,
  LogOut,
  Globe
} from "lucide-react";

export default function LinkedDevicesPage() {
  const devices = [
    {
      id: 1,
      name: "Google Chrome (Windows)",
      location: "New York, USA",
      active: true,
      icon: <Globe className="w-6 h-6 text-indigo-500" />
    },
    {
      id: 2,
      name: "MacBook Pro",
      location: "New York, USA",
      active: false,
      lastActive: "Last active today at 10:45 AM",
      icon: <Laptop className="w-6 h-6 text-slate-500 dark:text-slate-400" />
    },
    {
      id: 3,
      name: "Sky Verse Desktop (Windows)",
      location: "Boston, USA",
      active: false,
      lastActive: "Last active yesterday at 6:30 PM",
      icon: <Monitor className="w-6 h-6 text-slate-500 dark:text-slate-400" />
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Mobile */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        {/* Header */}
        <header className="px-4 py-4 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10 shadow-sm">
          <Link href="/app/settings" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center">Linked devices</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-8">
          
          <div className="flex flex-col items-center justify-center p-8 border-b border-slate-200 dark:border-slate-800 text-center bg-slate-50 dark:bg-slate-900/30">
            <div className="flex -space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md border-4 border-slate-50 dark:border-slate-900 z-20">
                <Laptop className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md border-4 border-slate-50 dark:border-slate-900 z-10 opacity-80 scale-90">
                <Monitor className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md border-4 border-slate-50 dark:border-slate-900 opacity-60 scale-75">
                <Globe className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
            
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Use Sky Verse on Web, Desktop, and other devices</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Link up to 4 devices to your account. Your messages stay seamlessly synced and completely secure with end-to-end encryption.
            </p>
            
            <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center">
              <Plus className="w-5 h-5 mr-2" />
              Link a device
            </button>
          </div>

          <div className="pt-2">
            <h3 className="px-4 py-3 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
              Device Status
            </h3>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {devices.map(device => (
                <div key={device.id} className="px-4 py-4 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 flex-shrink-0">
                    {device.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white flex items-center">
                      {device.name}
                      {device.active && (
                         <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold rounded uppercase tracking-wider">Active</span>
                      )}
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                      {device.active ? device.location : device.lastActive}
                    </p>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-4 mt-4">
             <button className="w-full py-3 bg-red-50 text-red-600 dark:bg-red-900/10 dark:text-red-400 font-semibold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center">
              <LogOut className="w-5 h-5 mr-2" />
              Log out from all devices
            </button>
          </div>
        </div>
      </div>

      {/* Detail View Placeholder for Desktop */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-64 p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col items-center text-center mb-8">
           <div className="w-48 h-48 bg-slate-100 dark:bg-slate-900 rounded-2xl mb-6 flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-inner relative overflow-hidden">
             {/* QR Code Mock */}
             <div className="w-32 h-32 opacity-20">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h-2v2h-2v2h2v2h2v-2h2v-2h-2v-2zm-2 4h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
               </svg>
             </div>
             {/* Scanner line animation */}
             <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/50 shadow-[0_0_10px_2px_rgba(99,102,241,0.5)] animate-[scan_2s_ease-in-out_infinite]"></div>
           </div>
           <h3 className="font-bold text-slate-800 dark:text-white mb-2">Scan QR Code</h3>
           <p className="text-sm text-slate-500 dark:text-slate-400">
             Open Sky Verse on your phone, go to Settings &gt; Linked Devices, and point your camera at this screen.
           </p>
        </div>
      </div>
    </div>
  );
}
