"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Cloud, 
  RefreshCcw, 
  HardDrive,
  Lock,
  ChevronRight,
  Database
} from "lucide-react";

export default function BackupSettingsPage() {
  const [backupRunning, setBackupRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const startBackup = () => {
    setBackupRunning(true);
    setProgress(0);
    
    // Simulate backup progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setBackupRunning(false);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

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
            <h1 className="text-xl font-bold">Chat Backup</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-8">
          
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col items-center text-center bg-slate-50 dark:bg-slate-900/30">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4 relative">
              <Cloud className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              {backupRunning && (
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-900/30">
                   <div 
                     className="absolute inset-0 rounded-full border-4 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" 
                   ></div>
                </div>
              )}
            </div>
            
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Last Backup</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4">
              Local: 2:00 AM<br/>
              Cloud: Yesterday, 3:45 PM<br/>
              Size: 450 MB
            </p>
            
            <p className="text-xs text-slate-500 mb-6 px-4">
              Back up your messages and media to Google Drive/iCloud so if you lose your phone or switch to a new one, your chat history is safe.
            </p>
            
            {backupRunning ? (
               <div className="w-full max-w-xs">
                 <div className="flex justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                   <span>Backing up...</span>
                   <span>{progress}%</span>
                 </div>
                 <div className="w-full h-2 bg-indigo-100 dark:bg-indigo-900/50 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-600 transition-all duration-200" style={{ width: `${progress}%` }}></div>
                 </div>
               </div>
            ) : (
              <button 
                onClick={startBackup}
                className="w-full max-w-xs py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition-colors flex items-center justify-center"
              >
                Back Up Now
              </button>
            )}
          </div>

          <div className="pt-2 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="px-4 py-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Cloud Settings
            </h3>
            
            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <Database className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">Google Drive account</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">user@example.com</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <RefreshCcw className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">Auto backup</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Daily</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex items-center">
                <HardDrive className="w-6 h-6 text-slate-400 mr-4" />
                <div>
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">Back up over</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Wi-Fi only</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          <div className="pt-2">
            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1 pr-4">
                <div className="flex items-center mb-1">
                  <Lock className="w-4 h-4 text-green-500 mr-2" />
                  <p className="text-base font-medium text-slate-800 dark:text-slate-200">End-to-end encrypted backup</p>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  On
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>

            <div className="px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
              <div className="flex-1 pr-4">
                <p className="text-base font-medium text-slate-800 dark:text-slate-200">Include videos</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  2.4 GB to be uploaded
                </p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  name="toggle" 
                  id="toggle" 
                  className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-indigo-600 dark:border-indigo-500 right-0 z-10 top-0 transition-all duration-300"
                  defaultChecked
                />
                <label 
                  htmlFor="toggle" 
                  className="toggle-label block overflow-hidden h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 cursor-pointer transition-colors duration-300"
                ></label>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Detail View Placeholder for Desktop */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-24 h-24 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-6">
          <Cloud className="w-10 h-10 text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Secure Cloud Backup
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
          Your messages and media are stored securely in the cloud. With End-to-End Encrypted Backups, not even Sky Verse can read them.
        </p>
      </div>
    </div>
  );
}
