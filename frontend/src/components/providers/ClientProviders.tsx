"use client";

import { CallProvider } from "@/context/CallContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { IncomingCallModal } from "@/components/calling/IncomingCallModal";
import { CallScreen } from "@/components/calling/CallScreen";

export const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CallProvider>
      <NotificationProvider>
        {children}
        <IncomingCallModal />
        <CallScreen />
      </NotificationProvider>
    </CallProvider>
  );
};
