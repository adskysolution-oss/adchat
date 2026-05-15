"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

interface CallContextType {
  socket: Socket | null;
  isIncomingCall: boolean;
  isOutgoingCall: boolean;
  isActiveCall: boolean;
  callData: any;
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  initiateCall: (participantIds: string[], type: string, chatId?: string) => void;
  acceptCall: () => void;
  rejectCall: () => void;
  endCall: () => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  isMuted: boolean;
  isVideoOff: boolean;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

export const CallProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [isOutgoingCall, setIsOutgoingCall] = useState(false);
  const [isActiveCall, setIsActiveCall] = useState(false);
  const [callData, setCallData] = useState<any>(null);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const configuration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  useEffect(() => {
    const s = io(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
    setSocket(s);

    // Mock User ID for demo
    const userId = "demo-user-id";
    s.emit("join_user_room", userId);

    s.on("call_incoming", (data) => {
      setCallData(data);
      setIsIncomingCall(true);
      // Play ringtone logic here
    });

    s.on("call_accepted", async (data) => {
      setIsOutgoingCall(false);
      setIsActiveCall(true);
      // WebRTC offer logic will be triggered here
    });

    s.on("call_rejected", () => {
      setIsOutgoingCall(false);
      setCallData(null);
      stopTracks();
    });

    s.on("call_offer", async ({ offer, from, callId }) => {
      if (!peerConnection.current) createPeerConnection();
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await peerConnection.current?.createAnswer();
      await peerConnection.current?.setLocalDescription(answer);
      s.emit("call_answer", { to: from, answer, callId, from: userId });
    });

    s.on("call_answer", async ({ answer }) => {
      await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(answer));
    });

    s.on("ice_candidate", async ({ candidate }) => {
      if (candidate) {
        await peerConnection.current?.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    s.on("call_ended", () => {
      endCallLocal();
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(configuration);
    
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.emit("ice_candidate", {
          to: callData.callerId || callData.participants[0].userId,
          candidate: event.candidate,
          callId: callData.callId || callData.id,
          from: "demo-user-id"
        });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current!);
      });
    }

    peerConnection.current = pc;
  };

  const initiateCall = async (participantIds: string[], type: string, chatId?: string) => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: type.includes("VIDEO"),
      audio: true,
    });
    setLocalStream(stream);
    localStreamRef.current = stream;
    setIsOutgoingCall(true);
    
    socket?.emit("call_initiate", {
      callerId: "demo-user-id",
      participantIds,
      type,
      chatId,
    });

    socket?.on("call_initiated", (data) => {
      setCallData(data);
    });
  };

  const acceptCall = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: callData.type.includes("VIDEO"),
      audio: true,
    });
    setLocalStream(stream);
    localStreamRef.current = stream;
    setIsIncomingCall(false);
    setIsActiveCall(true);

    socket?.emit("call_accept", {
      callId: callData.callId,
      userId: "demo-user-id",
      callerId: callData.caller.id
    });

    createPeerConnection();
    const offer = await peerConnection.current?.createOffer();
    await peerConnection.current?.setLocalDescription(offer);
    socket?.emit("call_offer", {
      to: callData.caller.id,
      offer,
      callId: callData.callId,
      from: "demo-user-id"
    });
  };

  const rejectCall = () => {
    socket?.emit("call_reject", {
      callId: callData.callId,
      userId: "demo-user-id",
      callerId: callData.caller.id
    });
    setIsIncomingCall(false);
    setCallData(null);
  };

  const endCallLocal = () => {
    setIsActiveCall(false);
    setIsOutgoingCall(false);
    setIsIncomingCall(false);
    setCallData(null);
    setRemoteStream(null);
    stopTracks();
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }
  };

  const endCall = () => {
    socket?.emit("call_end", {
      callId: callData?.id || callData?.callId,
      userId: "demo-user-id",
      participants: callData?.participantIds || []
    });
    endCallLocal();
  };

  const stopTracks = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
      setLocalStream(null);
      localStreamRef.current = null;
    }
  };

  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  return (
    <CallContext.Provider value={{
      socket, isIncomingCall, isOutgoingCall, isActiveCall, callData,
      localStream, remoteStream, initiateCall, acceptCall, rejectCall, endCall,
      toggleMute, toggleVideo, isMuted, isVideoOff
    }}>
      {children}
    </CallContext.Provider>
  );
};

export const useCall = () => {
  const context = useContext(CallContext);
  if (!context) throw new Error("useCall must be used within CallProvider");
  return context;
};
