"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  MoreVertical, 
  Phone, 
  Video, 
  Search, 
  Paperclip, 
  Smile, 
  Mic, 
  Send,
  Users,
  Info
} from "lucide-react";

export default function GroupChatPage() {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hey everyone! Are we still on for the meeting today?", sender: "Alice", isMe: false, time: "10:30 AM", avatar: "https://i.pravatar.cc/150?u=1", color: "text-rose-500" },
    { id: 2, text: "Yes, 3 PM works for me.", sender: "Bob", isMe: false, time: "10:32 AM", avatar: "https://i.pravatar.cc/150?u=2", color: "text-blue-500" },
    { id: 3, text: "I'll be joining a bit late, maybe 3:15.", sender: "Charlie", isMe: false, time: "10:35 AM", avatar: "https://i.pravatar.cc/150?u=3", color: "text-emerald-500" },
    { id: 4, text: "Sounds good. I'll send the Google Meet link in a bit.", sender: "You", isMe: true, time: "10:36 AM", avatar: "", color: "" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950/50 relative">
        {/* Chat Header */}
        <header className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center">
            <Link href="/app" className="mr-3">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div className="flex items-center cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mr-3 border border-slate-200 dark:border-slate-700">
                <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center">
                  Project Alpha Team
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                  Alice, Bob, Charlie, You
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block">
              <Video className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block">
              <Phone className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors hidden sm:block">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:hidden">
              <Phone className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="text-center my-4">
            <span className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs rounded-full shadow-sm">
              Today
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
            >
              {!msg.isMe && (
                <img
                  src={msg.avatar}
                  alt={msg.sender}
                  className="w-8 h-8 rounded-full object-cover mr-2 self-end mb-1"
                />
              )}
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                  msg.isMe
                    ? "bg-indigo-600 text-white rounded-br-none"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700"
                }`}
              >
                {!msg.isMe && (
                  <p className={`text-[12px] font-bold mb-0.5 ${msg.color}`}>{msg.sender}</p>
                )}
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <div
                  className={`text-[10px] text-right mt-1 flex justify-end items-center ${
                    msg.isMe ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  {msg.time}
                  {msg.isMe && (
                    <svg viewBox="0 0 16 15" width="16" height="15" className="ml-1 text-indigo-300">
                      <path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"></path>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-end bg-slate-100 dark:bg-slate-800 rounded-2xl px-2 py-1">
            <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors mb-1">
              <Smile className="w-6 h-6" />
            </button>
            <button className="p-2 text-slate-500 hover:text-indigo-600 transition-colors mb-1">
              <Paperclip className="w-6 h-6" />
            </button>
            
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 min-h-[44px] py-3 px-2 text-slate-900 dark:text-white"
              rows={1}
            />
            
            {message.trim() ? (
              <button className="p-2 mb-1 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-md ml-2">
                <Send className="w-5 h-5 ml-0.5" />
              </button>
            ) : (
              <button className="p-2 mb-1 text-slate-500 hover:text-indigo-600 transition-colors">
                <Mic className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Group Info Sidebar (Desktop only) */}
      <div className="hidden md:flex w-80 lg:w-96 flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
        <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
          <Info className="w-5 h-5 text-slate-500 mr-2" />
          <h2 className="font-bold text-slate-800 dark:text-white">Group Info</h2>
        </header>

        <div className="p-6 flex flex-col items-center border-b border-slate-200 dark:border-slate-800">
          <div className="w-32 h-32 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4 border-4 border-white dark:border-slate-800 shadow-lg">
            <Users className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Project Alpha Team</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">Group • 4 participants</p>
        </div>

        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Discussion group for Project Alpha development and milestones. Keep all updates here.
          </p>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
            Participants
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors">
              <div className="flex items-center">
                <img src="https://i.pravatar.cc/150?u=me" className="w-10 h-10 rounded-full mr-3" alt="You" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">You</p>
                  <p className="text-xs text-slate-500">Group Admin</p>
                </div>
              </div>
            </div>
            {['Alice', 'Bob', 'Charlie'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg cursor-pointer transition-colors">
                <div className="flex items-center">
                  <img src={`https://i.pravatar.cc/150?u=${i+1}`} className="w-10 h-10 rounded-full mr-3" alt={name} />
                  <p className="font-medium text-slate-900 dark:text-white">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
