"use client";

import React from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  MoreVertical, 
  Box, 
  Tag, 
  Link as LinkIcon, 
  Share2, 
  Edit3, 
  Trash2,
  Image as ImageIcon
} from "lucide-react";

export default function BusinessProductsPage() {
  const products = [
    {
      id: 1,
      name: "Premium Messaging API",
      price: "$49/month",
      desc: "Full access to Sky Verse business APIs with 10k messages/month included.",
      image: "api-icon",
      visible: true,
      link: "https://skyverse.com/p/api"
    },
    {
      id: 2,
      name: "CRM Integration Module",
      price: "$29/month",
      desc: "Seamlessly connect Sky Verse with your existing Salesforce or HubSpot CRM.",
      image: "crm-icon",
      visible: true,
      link: "https://skyverse.com/p/crm"
    },
    {
      id: 3,
      name: "Custom Theme Design",
      price: "$199 one-time",
      desc: "Get a fully customized, branded theme for your business chat interface.",
      image: "theme-icon",
      visible: false,
      link: "https://skyverse.com/p/theme"
    }
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar for Desktop / Full width for Mobile */}
      <div className="w-full md:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        
        {/* Header */}
        <header className="px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
          <div className="flex items-center">
            <Link href="/business" className="mr-3">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
            </Link>
            <h1 className="text-xl font-bold flex items-center">
              <Box className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
              Catalog
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Action Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm shadow-indigo-600/20 transition-all flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" />
            Add New Item
          </button>
          <div className="flex space-x-3 mt-3">
            <button className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center">
              <LinkIcon className="w-4 h-4 mr-2" /> Share Link
            </button>
            <button className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center">
              <Tag className="w-4 h-4 mr-2" /> Collections
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {products.length} Items
            </h2>
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
              Sort
            </button>
          </div>

          {products.map((product) => (
            <div 
              key={product.id} 
              className={`flex p-3 bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all hover:border-indigo-300 dark:hover:border-indigo-700 ${
                !product.visible ? 'border-slate-200 dark:border-slate-800 opacity-70' : 'border-slate-100 dark:border-slate-800'
              }`}
            >
              {/* Product Image Placeholder */}
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                <ImageIcon className="w-8 h-8 text-slate-400" />
                {!product.visible && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                    <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Hidden</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="ml-4 flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</h3>
                    <button className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm mt-0.5">{product.price}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 line-clamp-2">{product.desc}</p>
                </div>
                
                <div className="flex justify-between items-center mt-3 border-t border-slate-100 dark:border-slate-800 pt-2">
                  <span className="text-xs text-slate-400 font-medium truncate max-w-[120px]">
                    {product.link.replace('https://', '')}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State / Detail View for Desktop */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-8 border-l border-slate-200 dark:border-slate-800">
        <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex items-center justify-center mb-8 relative">
          <Box className="w-12 h-12 text-indigo-500" />
          <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white dark:border-slate-900">
            <Plus className="w-5 h-5" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
          Manage Your Catalog
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-md mb-8 leading-relaxed">
          Select an item from the list to view its details, or create a new product to share with your customers directly in chats.
        </p>
        <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Add New Item
        </button>
      </div>

    </div>
  );
}
