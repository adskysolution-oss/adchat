"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  DollarSign,
  AlignLeft,
  Check,
  Package
} from "lucide-react";

export default function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Main Container - Centered on Desktop */}
      <div className="w-full max-w-2xl mx-auto flex flex-col bg-white dark:bg-slate-950 md:border-x border-slate-200 dark:border-slate-800 shadow-sm min-h-screen">
        
        {/* Header */}
        <header className="px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 bg-white dark:bg-slate-950">
          <div className="flex items-center">
            <Link href="/business/products" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors" />
            </Link>
            <h1 className="text-xl font-bold">Add Item to Catalog</h1>
          </div>
          <button className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors flex items-center">
            <Check className="w-4 h-4 mr-1.5" /> Save
          </button>
        </header>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24">
          
          {/* Image Upload Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-32 h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group relative overflow-hidden">
               <ImageIcon className="w-8 h-8 text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
               <span className="text-xs font-medium text-slate-500 group-hover:text-indigo-500 transition-colors">Add Image</span>
            </div>
            <p className="text-xs text-slate-500 mt-3 text-center">Recommend 1:1 aspect ratio, up to 5MB.</p>
          </div>

          <div className="space-y-6">
            
            {/* Item Name */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Package className="w-4 h-4 mr-2 text-slate-400" />
                Item Name *
              </label>
              <input 
                type="text" 
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="E.g., Premium Consultation, API Access..."
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
                maxLength={60}
              />
              <div className="flex justify-end mt-1">
                 <span className="text-xs text-slate-400">{productName.length}/60</span>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                Price *
              </label>
              <input 
                type="text" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="E.g., $99, ₹5000..."
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <AlignLeft className="w-4 h-4 mr-2 text-slate-400" />
                Description
              </label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Describe this item. What's included? Who is it for?"
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none placeholder:text-slate-400"
                maxLength={500}
              ></textarea>
               <div className="flex justify-end mt-1">
                 <span className="text-xs text-slate-400">{description.length}/500</span>
              </div>
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 my-6"></div>

            {/* Additional Options */}
            <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Optional Details
            </h3>

            {/* Link */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <LinkIcon className="w-4 h-4 mr-2 text-slate-400" />
                Website Link
              </label>
              <input 
                type="url" 
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://yourwebsite.com/product"
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Item Code/SKU */}
            <div>
              <label className="flex items-center text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                <Tag className="w-4 h-4 mr-2 text-slate-400" />
                Item Code (SKU)
              </label>
              <input 
                type="text" 
                placeholder="E.g., PROD-001"
                className="w-full p-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-transparent focus:ring-2 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Visibility Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl mt-6">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Hide this item</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Hide item from your catalog instead of deleting it.</p>
              </div>
              <div className="relative inline-block w-10 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-indigo-600 z-10 top-0 left-0 transition-all duration-300"/>
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-5 rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors duration-300"></label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
