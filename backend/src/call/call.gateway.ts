import { 
  WebSocketGateway, 
  SubscribeMessage, 
  MessageBody, 
  ConnectedSocket, 
  WebSocketServer 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CallService } from './call.service';
import { CallStatus } from '@prisma/client';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CallGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly callService: CallService) {}

  @SubscribeMessage('call_initiate')
  async handleCallInitiate(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { callerId, participantIds, type, chatId } = data;
    
    const call = await this.callService.startCall(callerId, { 
      type, 
      chatId, 
      participantIds 
    });

    // Notify participants of incoming call
    participantIds.forEach(id => {
      this.server.to(`user_${id}`).emit('call_incoming', {
        callId: call.id,
        caller: call.caller,
        type: call.type,
      });
    });

    client.emit('call_initiated', call);
  }

  @SubscribeMessage('call_ring')
  async handleCallRing(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { callId, callerId } = data;
    await this.callService.updateCallStatus(callId, CallStatus.RINGING);
    this.server.to(`user_${callerId}`).emit('call_ringing', { callId });
  }

  @SubscribeMessage('call_accept')
  async handleCallAccept(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { callId, userId, callerId } = data;
    
    await this.callService.updateParticipantStatus(callId, userId, CallStatus.CONNECTED);
    await this.callService.updateCallStatus(callId, CallStatus.CONNECTED);

    this.server.to(`user_${callerId}`).emit('call_accepted', { callId, userId });
  }

  @SubscribeMessage('call_reject')
  async handleCallReject(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { callId, userId, callerId } = data;
    
    await this.callService.updateParticipantStatus(callId, userId, CallStatus.REJECTED);
    this.server.to(`user_${callerId}`).emit('call_rejected', { callId, userId });
  }

  @SubscribeMessage('call_offer')
  handleCallOffer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { to, offer, callId } = data;
    this.server.to(`user_${to}`).emit('call_offer', { from: data.from, offer, callId });
  }

  @SubscribeMessage('call_answer')
  handleCallAnswer(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { to, answer, callId } = data;
    this.server.to(`user_${to}`).emit('call_answer', { from: data.from, answer, callId });
  }

  @SubscribeMessage('ice_candidate')
  handleIceCandidate(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { to, candidate, callId } = data;
    this.server.to(`user_${to}`).emit('ice_candidate', { from: data.from, candidate, callId });
  }

  @SubscribeMessage('call_end')
  async handleCallEnd(@ConnectedSocket() client: Socket, @MessageBody() data: any) {
    const { callId, userId, participants } = data;
    await this.callService.updateCallStatus(callId, CallStatus.ENDED);
    
    participants.forEach(id => {
      if (id !== userId) {
        this.server.to(`user_${id}`).emit('call_ended', { callId });
      }
    });
  }
}
