"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Key, 
  Lock, 
  MessageSquare, 
  Bell, 
  Database, 
  HelpCircle, 
  Users, 
  Smartphone,
  ChevronRight,
  Shield,
  Palette
} from "lucide-react";

export default function SettingsPage() {
  const settingsOptions = [
    {
      icon: <Key className="w-6 h-6 text-slate-500" />,
      title: "Account",
      subtitle: "Security notifications, change number",
      href: "/app/settings/account",
    },
    {
      icon: <Lock className="w-6 h-6 text-slate-500" />,
      title: "Privacy",
      subtitle: "Block contacts, disappearing messages",
      href: "/app/settings/privacy",
    },
    {
      icon: <Shield className="w-6 h-6 text-slate-500" />,
      title: "Security",
      subtitle: "Passkeys, 2-step verification",
      href: "/app/settings/security",
    },
    {
      icon: <Palette className="w-6 h-6 text-slate-500" />,
      title: "Theme & Customization",
      subtitle: "Wallpaper, colors, chat bubble styles",
      href: "/app/settings/theme",
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-slate-500" />,
      title: "Chats",
      subtitle: "Theme, wallpapers, chat history",
      href: "/app/settings/chats",
    },
    {
      icon: <Bell className="w-6 h-6 text-slate-500" />,
      title: "Notifications",
      subtitle: "Message, group & call tones",
      href: "/app/settings/notifications",
    },
    {
      icon: <Database className="w-6 h-6 text-slate-500" />,
      title: "Storage and data",
      subtitle: "Network usage, auto-download",
      href: "/app/settings/storage",
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-slate-500" />,
      title: "Help",
      subtitle: "Help center, contact us, privacy policy",
      href: "/app/settings/help",
    },
    {
      icon: <Users className="w-6 h-6 text-slate-500" />,
      title: "Invite a friend",
      subtitle: "",
      href: "#",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar / Main Content Area for Mobile */}
      <div className="w-full md:w-96 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        {/* Header */}
        <header className="px-4 py-3 flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <Link href="/app" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
          </Link>
          <h1 className="text-xl font-bold">Settings</h1>
        </header>

        <div className="flex-1 overflow-y-auto pb-20">
          {/* Profile Section */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
            <img
              src="https://i.pravatar.cc/150?u=me"
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Abhi</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Available</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
            </div>
          </div>

          {/* Settings List */}
          <div className="py-2">
            {settingsOptions.map((option, index) => (
              <Link
                key={index}
                href={option.href}
                className="flex items-center px-4 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="w-10 flex justify-center mr-2">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-slate-900 dark:text-white">{option.title}</h3>
                  {option.subtitle && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">{option.subtitle}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="p-6 flex flex-col items-center border-t border-slate-200 dark:border-slate-800 mt-4">
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-2">from</p>
            <div className="flex items-center font-bold text-slate-800 dark:text-white text-lg">
              <span className="text-indigo-600 dark:text-indigo-400 mr-2">∞</span>
              SKY VERSE
            </div>
          </div>
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <nav className="md:hidden flex items-center justify-around p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 absolute bottom-0 w-full z-10">
          <Link href="/app" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <span className="text-[10px] font-medium mt-1">Chats</span>
          </Link>
          <Link href="/app/status" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            <span className="text-[10px] font-medium mt-1">Updates</span>
          </Link>
          <Link href="/app/calls" className="flex flex-col items-center p-2 text-slate-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span className="text-[10px] font-medium mt-1">Calls</span>
          </Link>
          <Link href="/app/settings" className="flex flex-col items-center p-2 text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            <span className="text-[10px] font-medium mt-1">Settings</span>
          </Link>
        </nav>
      </div>

      {/* Empty State for Desktop Settings Detail View */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8">
        <div className="w-24 h-24 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Settings
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
          Select an option from the menu to manage your account, privacy, and preferences.
        </p>
      </div>
    </div>
  );
}
