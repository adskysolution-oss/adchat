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
  User,
  ShoppingBag,
  Tag,
  Clock,
  ChevronRight,
  PlusCircle,
  FileText
} from "lucide-react";

export default function BusinessChatPage() {
  const [message, setMessage] = useState("");

  const messages = [
    { id: 1, text: "Hi, I'm interested in your premium plan.", sender: "customer", time: "10:30 AM" },
    { id: 2, text: "Hello! Thank you for your interest. The premium plan includes advanced CRM features, bulk messaging, and API access.", sender: "business", time: "10:32 AM" },
    { id: 3, text: "Can you send me the pricing details?", sender: "customer", time: "10:35 AM" },
    { id: 4, text: "Certainly! I've attached our pricing brochure below.", sender: "business", time: "10:36 AM" },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden">
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-100 dark:bg-slate-950/50 relative">
        {/* Chat Header */}
        <header className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center z-10 shadow-sm">
          <div className="flex items-center">
            <Link href="/business" className="mr-3">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </Link>
            <div className="flex items-center cursor-pointer">
              <img
                src="https://i.pravatar.cc/150?u=customer1"
                alt="John Doe"
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white flex items-center">
                  John Doe
                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 text-[10px] font-bold rounded-full">
                    Hot Lead
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Online</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors md:hidden">
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
              className={`flex ${msg.sender === "business" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                  msg.sender === "business"
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-100 dark:border-slate-700"
                }`}
              >
                <p className="text-[15px] leading-relaxed">{msg.text}</p>
                <div
                  className={`text-[10px] text-right mt-1 ${
                    msg.sender === "business" ? "text-indigo-200" : "text-slate-400"
                  }`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}
          
          {/* Business Document attachment mock */}
          <div className="flex justify-end">
            <div className="max-w-[75%] px-4 py-3 rounded-2xl shadow-sm bg-indigo-600 text-white rounded-tr-none flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold truncate">Sky_Verse_Pricing_2026.pdf</p>
                <p className="text-xs text-indigo-200">2.4 MB • PDF Document</p>
              </div>
              <button className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-400 transition-colors">
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Replies Strip (Business specific) */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex space-x-2 overflow-x-auto no-scrollbar">
          <button className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors whitespace-nowrap">
            /pricing
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors whitespace-nowrap">
            /greeting
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors whitespace-nowrap">
            /book_demo
          </button>
          <button className="flex-shrink-0 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors whitespace-nowrap flex items-center">
            <PlusCircle className="w-3 h-3 mr-1" /> New Quick Reply
          </button>
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
              placeholder="Type a message or use '/' for quick replies"
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

      {/* CRM / Contact Info Sidebar (Desktop only) */}
      <div className="hidden md:flex w-80 lg:w-96 flex-col bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 overflow-y-auto">
        <header className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-900 z-10">
          <h2 className="font-bold text-slate-800 dark:text-white">Contact CRM</h2>
          <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">Edit</button>
        </header>

        <div className="p-6 flex flex-col items-center border-b border-slate-200 dark:border-slate-800">
          <img
            src="https://i.pravatar.cc/150?u=customer1"
            alt="John Doe"
            className="w-24 h-24 rounded-full object-cover shadow-md mb-4"
          />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">John Doe</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">+1 (555) 123-4567</p>
          <div className="flex space-x-2 mt-2">
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center">
            <Tag className="w-4 h-4 mr-2" /> Labels
          </h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500 text-xs font-semibold rounded-full flex items-center cursor-pointer hover:bg-yellow-200 transition-colors">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              Hot Lead
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500 text-xs font-semibold rounded-full flex items-center cursor-pointer hover:bg-blue-200 transition-colors">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Premium Interested
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 text-xs font-semibold rounded-full flex items-center cursor-pointer hover:bg-slate-200 transition-colors border border-dashed border-slate-300 dark:border-slate-600">
              <PlusCircle className="w-3 h-3 mr-1" /> Add Label
            </span>
          </div>
        </div>

        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center">
            <User className="w-4 h-4 mr-2" /> CRM Details
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">john.doe@company.com</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Company</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Acme Corp Ltd.</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Lead Source</p>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Website Landing Page</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Recent Activity
          </h3>
          <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-3 space-y-6">
            <div className="relative pl-6">
              <div className="absolute w-4 h-4 bg-indigo-600 rounded-full border-4 border-white dark:border-slate-900 -left-[9px] top-1"></div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Sent Pricing Document</p>
              <p className="text-xs text-slate-500">Today, 10:36 AM</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full border-4 border-white dark:border-slate-900 -left-[9px] top-1"></div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Initial Contact</p>
              <p className="text-xs text-slate-500">Today, 10:30 AM</p>
            </div>
            <div className="relative pl-6">
              <div className="absolute w-4 h-4 bg-slate-300 dark:bg-slate-600 rounded-full border-4 border-white dark:border-slate-900 -left-[9px] top-1"></div>
              <p className="text-sm font-semibold text-slate-800 dark:text-white">Added to CRM via WebForm</p>
              <p className="text-xs text-slate-500">Yesterday, 4:45 PM</p>
            </div>
          </div>
          
          <button className="w-full mt-6 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 dark:text-indigo-400 font-semibold rounded-lg transition-colors flex items-center justify-center">
            <Clock className="w-4 h-4 mr-2" /> Add Follow-up Reminder
          </button>
        </div>
      </div>
    </div>
  );
}
