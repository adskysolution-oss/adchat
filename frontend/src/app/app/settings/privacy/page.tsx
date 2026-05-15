"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  EyeOff, 
  UserX, 
  Timer, 
  MessageCircle, 
  Lock, 
  Fingerprint,
  ChevronRight,
  Shield,
  Eye,
  CheckCircle2
} from "lucide-react";

export default function PrivacySettingsPage() {
  const [readReceipts, setReadReceipts] = useState(true);

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
            <h1 className="text-xl font-bold flex items-center">Privacy</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-8">
          
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/10 border-b border-slate-200 dark:border-slate-800 flex items-start space-x-3">
            <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-sm font-semibold text-indigo-900 dark:text-indigo-300">Privacy checkup</h2>
              <p className="text-xs text-indigo-700 dark:text-indigo-400/80 mt-1 mb-2">
                Control your privacy and choose the right settings for you.
              </p>
              <button className="text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-full transition-colors shadow-sm">
                Start checkup
              </button>
            </div>
          </div>

          <div className="pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Who can see my personal info
            </h3>
            
            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Last seen and online</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nobody</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Profile photo</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">My contacts</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">About</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Everyone</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Status</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">My contacts</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer" onClick={() => setReadReceipts(!readReceipts)}>
              <div className="flex-1 pr-4">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Read receipts</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  If turned off, you won't send or receive Read receipts. Read receipts are always sent for group chats.
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="toggle" 
                  id="toggle" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-indigo-600 dark:checked:border-indigo-500 z-10 top-0 left-0 transition-all duration-300"
                  checked={readReceipts}
                  onChange={() => {}}
                  style={{
                    transform: readReceipts ? 'translateX(100%)' : 'translateX(0)',
                    borderColor: readReceipts ? '#4f46e5' : '#cbd5e1'
                  }}
                />
                <label 
                  htmlFor="toggle" 
                  className={`toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300 ${readReceipts ? 'bg-indigo-600 dark:bg-indigo-500' : ''}`}
                ></label>
              </div>
            </div>
          </div>

          <div className="pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Disappearing messages
            </h3>
            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <Timer className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">Default message timer</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Off</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="pt-2 pb-4">
            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Groups</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Everyone</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Live location</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">None</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <UserX className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">Blocked contacts</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">12</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <Fingerprint className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">App lock</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Disabled</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Detail View Placeholder for Desktop */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6 relative">
          <Shield className="w-10 h-10 text-indigo-500" />
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white border-2 border-white dark:border-slate-900 shadow-sm">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Your Privacy
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
          Control who can see your information and manage your privacy preferences. Select an option from the menu to configure.
        </p>
      </div>
    </div>
  );
}
