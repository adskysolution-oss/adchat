"use client";

import React from "react";
import { Phone, PhoneOff, Video, X } from "lucide-react";
import { useCall } from "@/context/CallContext";
import { motion, AnimatePresence } from "framer-motion";

export const IncomingCallModal = () => {
  const { isIncomingCall, callData, acceptCall, rejectCall } = useCall();

  if (!isIncomingCall) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
        >
          <div className="p-8 text-center">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mx-auto ring-4 ring-indigo-500/20">
                {callData?.caller?.profileImage ? (
                  <img src={callData.caller.profileImage} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <Phone className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                {callData?.type.includes("VIDEO") ? <Video className="w-4 h-4 text-white" /> : <Phone className="w-4 h-4 text-white" />}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-1">{callData?.caller?.firstName || "Unknown Caller"}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">Incoming {callData?.type === "VIDEO" ? "Video" : "Voice"} Call...</p>
          </div>

          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-center gap-8 border-t border-slate-100 dark:border-slate-800">
            <button 
              onClick={rejectCall}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 transition-all hover:scale-110"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
            <button 
              onClick={acceptCall}
              className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110 animate-bounce"
            >
              <Phone className="w-7 h-7" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
