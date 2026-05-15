"use client";

import React, { useState, useEffect } from "react";
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
  Image as ImageIcon,
  X,
  ChevronRight,
  Eye,
  EyeOff
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function BusinessProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const businessId = 'demo-business-id'; // Placeholder
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/catalog/products/${businessId}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/catalog/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchProducts();
        if (selectedProduct?.id === id) setSelectedProduct(null);
      }
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans overflow-hidden">
      {/* List View */}
      <div className={cn(
        "w-full md:w-[450px] lg:w-[500px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-all",
        selectedProduct && "hidden lg:flex"
      )}>
        
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
          <button className="p-2 text-slate-600 hover:text-indigo-600"><Search className="w-5 h-5" /></button>
        </header>

        {/* Action Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <Link href="/business/products/add" className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center">
            <Plus className="w-5 h-5 mr-2" /> Add New Item
          </Link>
          <div className="flex space-x-2 mt-3">
            <button className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center">
              <Tag className="w-4 h-4 mr-2" /> Collections
            </button>
            <button className="flex-1 py-2 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center">
              <Share2 className="w-4 h-4 mr-2" /> Share Link
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div>
          ) : products.map((product) => (
            <div 
              key={product.id} 
              onClick={() => setSelectedProduct(product)}
              className={cn(
                "flex p-3 rounded-2xl border transition-all cursor-pointer group",
                selectedProduct?.id === product.id 
                  ? "bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-300 dark:border-indigo-700" 
                  : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 hover:border-indigo-200"
              )}
            >
              <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center shrink-0 relative overflow-hidden">
                {product.media?.[0] ? (
                  <img src={product.media[0].url} className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                )}
                {product.isHidden && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><EyeOff className="w-4 h-4 text-white" /></div>
                )}
              </div>
              <div className="ml-4 flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600">{product.name}</h3>
                <p className="text-indigo-600 dark:text-indigo-400 font-bold text-xs mt-1">${product.price || 0}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-slate-500">{product.category?.name || 'General'}</span>
                  {product.sku && <span className="text-[10px] text-slate-400 font-medium">SKU: {product.sku}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail View */}
      <div className={cn(
        "flex-1 flex flex-col bg-white dark:bg-slate-950 overflow-hidden",
        !selectedProduct && "hidden md:flex"
      )}>
        {!selectedProduct ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-4">
              <Box className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-xl font-bold mb-2">Select a product to view details</h2>
            <p className="text-slate-500 max-w-xs">You can edit stock, price, and media for your catalog items here.</p>
          </div>
        ) : (
          <>
            <header className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedProduct(null)} className="lg:hidden"><ArrowLeft className="w-6 h-6" /></button>
                <h2 className="font-bold">Product Details</h2>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600"><Edit3 className="w-5 h-5" /></button>
                <button onClick={() => deleteProduct(selectedProduct.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 className="w-5 h-5" /></button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="aspect-square rounded-3xl bg-slate-100 dark:bg-slate-900 overflow-hidden border border-slate-200 dark:border-slate-800 relative group">
                  {selectedProduct.media?.[0] ? (
                    <img src={selectedProduct.media[0].url} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300"><ImageIcon className="w-20 h-20" /></div>
                  )}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-2 bg-black/60 text-white rounded-full backdrop-blur-md"><Edit3 className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold">{selectedProduct.name}</h1>
                      <p className="text-indigo-600 font-bold text-2xl mt-1">${selectedProduct.price}</p>
                    </div>
                    <div className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border",
                      selectedProduct.stockStatus === 'IN_STOCK' ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
                    )}>
                      {selectedProduct.stockStatus.replace('_', ' ')}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-2">Description</h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {selectedProduct.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">SKU</p>
                      <p className="font-bold">{selectedProduct.sku || 'N/A'}</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Category</p>
                      <p className="font-bold">{selectedProduct.category?.name || 'General'}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                    <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-xl shadow-indigo-600/20 transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" /> Share to Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
