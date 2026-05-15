"use client";

import { motion } from "framer-motion";
import { MessageSquareText } from "lucide-react";

export default function SplashScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 blur-[120px] rounded-full animate-pulse delay-700" />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-primary/40 blur-2xl rounded-full" />
          <div className="relative w-24 h-24 premium-gradient rounded-3xl flex items-center justify-center shadow-2xl">
            <MessageSquareText className="w-12 h-12 text-white" />
          </div>
        </div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-bold tracking-tight text-white mb-2"
        >
          Sky <span className="text-secondary">Verse</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-white/60 text-sm tracking-widest uppercase font-medium"
        >
          Secure Messaging Evolution
        </motion.p>
      </motion.div>

      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>
        <p className="text-white/40 text-xs font-light">Encrypted by SkyLock Protocol</p>
      </div>
    </div>
  );
}
