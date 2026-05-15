"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useCall } from "./CallContext";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  body: string;
  type: string;
}

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (n: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { socket } = useCall();

  useEffect(() => {
    if (!socket) return;

    socket.on("notification", (n: Notification) => {
      setNotifications(prev => [n, ...prev]);
      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(item => item.id !== n.id));
      }, 5000);
    });

    return () => { socket.off("notification"); };
  }, [socket]);

  const addNotification = (n: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [{ ...n, id }, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
      <div className="fixed top-6 right-6 z-[200] flex flex-col gap-3 w-80">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              className="bg-white dark:bg-slate-900 border border-border dark:border-border-dark p-4 rounded-2xl shadow-2xl flex gap-4 items-start group"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold truncate">{n.title}</h4>
                <p className="text-xs text-foreground/50 line-clamp-2">{n.body}</p>
              </div>
              <button onClick={() => removeNotification(n.id)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-foreground/20 hover:text-foreground">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification must be used within NotificationProvider");
  return context;
};
