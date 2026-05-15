"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Palette, 
  Type, 
  MessageCircle, 
  EyeOff, 
  Clock, 
  ShieldAlert, 
  Download, 
  Calendar, 
  MessageSquarePlus, 
  HardDrive,
  ToggleLeft,
  ToggleRight,
  Sparkles
} from "lucide-react";

export default function PowerUserSettings() {
  const [settings, setSettings] = useState({
    hideOnline: true,
    hideTyping: false,
    hideBlueTick: true,
    freezeLastSeen: false,
    antiDelete: true,
    statusDownloader: true,
    largeMedia: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  interface PowerItem {
    icon: React.ReactNode;
    label: string;
    desc: string;
    toggle?: string;
    link?: string;
  }

  const sections: { title: string; items: PowerItem[] }[] = [
    {
      title: "Customization & Theming",
      items: [
        { icon: <Palette className="w-5 h-5" />, label: "Theme Store", desc: "Download and apply community themes" },
        { icon: <Type className="w-5 h-5" />, label: "Custom Fonts", desc: "Change app font family and size" },
        { icon: <MessageCircle className="w-5 h-5" />, label: "Chat Bubble Style", desc: "Customize message bubble shapes and colors" },
      ]
    },
    {
      title: "Advanced Privacy",
      items: [
        { 
          icon: <EyeOff className="w-5 h-5" />, 
          label: "Hide Online Status", 
          desc: "Browse while appearing offline",
          toggle: "hideOnline" 
        },
        { 
          icon: <Type className="w-5 h-5" />, 
          label: "Hide Typing Indicator", 
          desc: "Others won't see when you're typing",
          toggle: "hideTyping" 
        },
        { 
          icon: <MessageCircle className="w-5 h-5" />, 
          label: "Hide Blue Ticks", 
          desc: "Read messages without sending read receipts",
          toggle: "hideBlueTick" 
        },
        { 
          icon: <Clock className="w-5 h-5" />, 
          label: "Freeze Last Seen", 
          desc: "Keep your last seen fixed at a specific time",
          toggle: "freezeLastSeen" 
        },
      ]
    },
    {
      title: "Power Features",
      items: [
        { 
          icon: <ShieldAlert className="w-5 h-5" />, 
          label: "Anti-Delete Messages", 
          desc: "View messages even after sender deletes them",
          toggle: "antiDelete" 
        },
        { 
          icon: <Download className="w-5 h-5" />, 
          label: "Status Downloader", 
          desc: "Save contacts' status updates locally",
          toggle: "statusDownloader" 
        },
        { 
          icon: <Calendar className="w-5 h-5" />, 
          label: "Message Scheduler", 
          desc: "Schedule messages to be sent later",
          link: "/app/scheduler" 
        },
        { 
          icon: <MessageSquarePlus className="w-5 h-5" />, 
          label: "Auto Reply", 
          desc: "Set automatic replies for incoming messages",
          link: "/app/auto-reply" 
        },
        { 
          icon: <HardDrive className="w-5 h-5" />, 
          label: "Large Media Sharing", 
          desc: "Send files up to 2GB in original quality",
          toggle: "largeMedia" 
        },
      ]
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / Main Content Area for Mobile */}
      <div className="w-full md:w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        {/* Header */}
        <header className="px-4 py-4 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10 shadow-sm">
          <Link href="/app/settings" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold flex items-center">
              <Sparkles className="w-5 h-5 text-indigo-500 mr-2" />
              Power Features
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Advanced tools and customization</p>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-8">
          {sections.map((section, idx) => (
            <div key={idx} className="mb-6">
              <h2 className="px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider bg-slate-50 dark:bg-slate-900/50">
                {section.title}
              </h2>
              <div className="bg-white dark:bg-slate-950 divide-y divide-slate-100 dark:divide-slate-800/50">
                {section.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="px-4 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
                    onClick={() => item.toggle && toggleSetting(item.toggle as keyof typeof settings)}
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                        {item.icon}
                      </div>
                      <div className="flex-1 pr-4">
                        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">{item.label}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                    {item.toggle ? (
                      <button className="focus:outline-none">
                        {settings[item.toggle as keyof typeof settings] ? (
                          <ToggleRight className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                        ) : (
                          <ToggleLeft className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                        )}
                      </button>
                    ) : (
                      <Link href={item.link || "#"} className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">
                        Configure
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          <div className="px-6 py-8 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/30">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Sky Verse Premium</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
              You're using Sky Verse Power Features. Enjoy unparalleled control over your privacy and experience.
            </p>
          </div>
        </div>
      </div>

      {/* Empty State for Desktop Detail View */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
        <div className="w-32 h-32 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 relative">
          <Sparkles className="w-12 h-12 text-indigo-500" />
          <div className="absolute top-0 right-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-slate-900 shadow-md">
            PRO
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4 text-center">
          Supercharge Your Messaging
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8 text-lg">
          Select a power feature from the menu to customize your advanced settings and take full control of your privacy.
        </p>
      </div>
    </div>
  );
}
