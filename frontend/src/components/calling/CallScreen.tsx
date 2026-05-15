"use client";

import React, { useEffect, useRef } from "react";
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, 
  Maximize2, Minimize2, MoreHorizontal, User,
  Volume2, VolumeX, Shield, Zap
} from "lucide-react";
import { useCall } from "@/context/CallContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export const CallScreen = () => {
  const { 
    isActiveCall, isOutgoingCall, callData, localStream, remoteStream, 
    endCall, toggleMute, toggleVideo, isMuted, isVideoOff 
  } = useCall();

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream, isActiveCall, isOutgoingCall]);

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream, isActiveCall]);

  if (!isActiveCall && !isOutgoingCall) return null;

  const isVideo = callData?.type.includes("VIDEO");

  return (
    <div className="fixed inset-0 z-[110] bg-slate-950 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/20 to-slate-950" />
      
      {/* Call Info (Top) */}
      <div className="absolute top-12 left-0 right-0 z-20 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-4 h-4 text-green-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">End-to-End Encrypted</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {callData?.caller?.firstName || callData?.participants?.[0]?.user?.firstName || "Connecting..."}
        </h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
            {isOutgoingCall ? "Ringing..." : "Secure Call"}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        {isVideo ? (
          <div className="relative w-full h-full max-w-5xl aspect-video rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl">
            {/* Remote Video */}
            {remoteStream ? (
              <video 
                ref={remoteVideoRef} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-800 flex items-center justify-center animate-pulse">
                  <User className="w-16 h-16 text-slate-600" />
                </div>
              </div>
            )}

            {/* Local Video (PiP) */}
            <div className="absolute top-6 right-6 w-32 md:w-48 aspect-video rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-800 group cursor-move">
              <video 
                ref={localVideoRef} 
                autoPlay 
                playsInline 
                muted 
                className={cn("w-full h-full object-cover", isVideoOff && "hidden")} 
              />
              {isVideoOff && (
                <div className="w-full h-full flex items-center justify-center">
                  <VideoOff className="w-6 h-6 text-slate-400" />
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Voice Call UI */
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping scale-150" />
              <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping delay-700 scale-[2]" />
              <div className="w-48 h-48 rounded-full bg-indigo-600/10 border-2 border-indigo-500/30 flex items-center justify-center relative z-10">
                <div className="w-40 h-40 rounded-full bg-slate-900 border border-slate-800 overflow-hidden flex items-center justify-center">
                   {callData?.caller?.profileImage ? (
                      <img src={callData.caller.profileImage} className="w-full h-full object-cover" />
                   ) : (
                      <User className="w-16 h-16 text-indigo-400" />
                   )}
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex gap-4">
              <div className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full flex items-center gap-2">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase">HD Audio</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Controls (Bottom) */}
      <div className="absolute bottom-16 z-30 flex items-center gap-6 md:gap-10">
        <button 
          onClick={toggleMute}
          className={cn(
            "w-14 h-14 rounded-full flex items-center justify-center transition-all",
            isMuted ? "bg-white text-slate-950" : "bg-slate-800 text-white hover:bg-slate-700"
          )}
        >
          {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {isVideo && (
          <button 
            onClick={toggleVideo}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center transition-all",
              isVideoOff ? "bg-white text-slate-950" : "bg-slate-800 text-white hover:bg-slate-700"
            )}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        )}

        <button 
          onClick={endCall}
          className="w-20 h-20 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-500/40 transition-all hover:scale-110"
        >
          <PhoneOff className="w-8 h-8" />
        </button>

        <button className="w-14 h-14 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center">
          <Volume2 className="w-6 h-6" />
        </button>

        <button className="w-14 h-14 rounded-full bg-slate-800 text-white hover:bg-slate-700 flex items-center justify-center">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Network Status */}
      <div className="absolute bottom-8 right-8 flex items-center gap-2">
        <div className="flex gap-0.5 items-end h-3">
          <div className="w-1 h-1 bg-green-500 rounded-full" />
          <div className="w-1 h-2 bg-green-500 rounded-full" />
          <div className="w-1 h-3 bg-green-500 rounded-full" />
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Excellent</span>
      </div>
    </div>
  );
};
