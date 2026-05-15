import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Allows all origins for development
  },
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // In a real app, verify JWT token from client.handshake.auth.token
    const userId = client.handshake.query.userId as string;
    
    if (userId) {
      client.join(userId); // Join a room for personal notifications
      this.logger.log(`Client connected: ${client.id} (User: ${userId})`);
      
      // Broadcast online status
      client.broadcast.emit('user_online', { userId, timestamp: new Date() });
      this.chatService.updateUserOnlineStatus(userId, true);
    } else {
      this.logger.log(`Client connected: ${client.id} (Anonymous)`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.logger.log(`Client disconnected: ${client.id}`);
    
    if (userId) {
      client.broadcast.emit('user_offline', { userId, timestamp: new Date() });
      this.chatService.updateUserOnlineStatus(userId, false);
    }
  }

  // ---------------------------------------------------------
  // Chat Room Management
  // ---------------------------------------------------------

  @SubscribeMessage('join_chat')
  handleJoinChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.join(data.chatId);
    this.logger.log(`Client ${client.id} joined chat ${data.chatId}`);
    return { event: 'joined_chat', data };
  }

  @SubscribeMessage('leave_chat')
  handleLeaveChat(@MessageBody() data: { chatId: string }, @ConnectedSocket() client: Socket) {
    client.leave(data.chatId);
    return { event: 'left_chat', data };
  }

  // ---------------------------------------------------------
  // Message Sending & Delivery
  // ---------------------------------------------------------

  @SubscribeMessage('send_message')
  async handleSendMessage(@MessageBody() payload: any, @ConnectedSocket() client: Socket) {
    // payload: { chatId, senderId, type, content, mediaUrl, replyToId }
    try {
      const message = await this.chatService.createMessage(payload);
      
      // Emit to everyone in the chat room (including sender to confirm it's sent)
      this.server.to(payload.chatId).emit('receive_message', message);
      
      return { status: 'success', messageId: message.id };
    } catch (error) {
      this.logger.error(`Error sending message: ${error.message}`);
      return { status: 'error', error: 'Failed to send message' };
    }
  }

  @SubscribeMessage('message_delivered')
  async handleMessageDelivered(@MessageBody() data: { messageId: string; chatId: string; userId: string }) {
    await this.chatService.updateMessageStatus(data.messageId, 'DELIVERED');
    this.server.to(data.chatId).emit('message_status_update', {
      messageId: data.messageId,
      status: 'DELIVERED',
      userId: data.userId
    });
  }

  @SubscribeMessage('message_read')
  async handleMessageRead(@MessageBody() data: { messageId: string; chatId: string; userId: string }) {
    await this.chatService.updateMessageStatus(data.messageId, 'READ');
    this.server.to(data.chatId).emit('message_status_update', {
      messageId: data.messageId,
      status: 'READ',
      userId: data.userId
    });
  }

  // ---------------------------------------------------------
  // Message Actions (Edit, Delete, React)
  // ---------------------------------------------------------

  @SubscribeMessage('edit_message')
  async handleEditMessage(@MessageBody() data: { messageId: string; chatId: string; newContent: string; editorId: string }) {
    const editedMessage = await this.chatService.editMessage(data);
    this.server.to(data.chatId).emit('message_edited', editedMessage);
  }

  @SubscribeMessage('delete_message')
  async handleDeleteMessage(@MessageBody() data: { messageId: string; chatId: string; userId: string; forEveryone: boolean }) {
    await this.chatService.deleteMessage(data);
    if (data.forEveryone) {
      this.server.to(data.chatId).emit('message_deleted', { messageId: data.messageId });
    }
  }

  @SubscribeMessage('reaction_added')
  async handleReactionAdd(@MessageBody() data: { messageId: string; chatId: string; userId: string; emoji: string }) {
    const reaction = await this.chatService.addReaction(data);
    this.server.to(data.chatId).emit('reaction_updated', { type: 'ADDED', reaction });
  }

  // ---------------------------------------------------------
  // Typing & Recording Indicators
  // ---------------------------------------------------------

  @SubscribeMessage('typing_start')
  handleTypingStart(@MessageBody() data: { chatId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(data.chatId).emit('typing_start', { chatId: data.chatId, userId: data.userId });
  }

  @SubscribeMessage('typing_stop')
  handleTypingStop(@MessageBody() data: { chatId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(data.chatId).emit('typing_stop', { chatId: data.chatId, userId: data.userId });
  }

  @SubscribeMessage('recording_start')
  handleRecordingStart(@MessageBody() data: { chatId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(data.chatId).emit('recording_start', { chatId: data.chatId, userId: data.userId });
  }

  @SubscribeMessage('recording_stop')
  handleRecordingStop(@MessageBody() data: { chatId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(data.chatId).emit('recording_stop', { chatId: data.chatId, userId: data.userId });
  }

  // ---------------------------------------------------------
  // Social & Social Communication Events (Step 4)
  // ---------------------------------------------------------

  @SubscribeMessage('new_status')
  handleNewStatus(@MessageBody() data: { userId: string; statusId: string }) {
    // Broadcast to contacts only (logic would be handled by status service)
    this.server.emit('new_status', data);
  }

  @SubscribeMessage('status_viewed')
  handleStatusViewed(@MessageBody() data: { statusId: string; viewerId: string; ownerId: string }) {
    this.server.to(data.ownerId).emit('status_viewed', data);
  }

  @SubscribeMessage('channel_post_created')
  handleChannelPostCreated(@MessageBody() data: { channelId: string; postId: string }) {
    this.server.to(data.channelId).emit('channel_post_created', data);
  }

  @SubscribeMessage('community_announcement')
  handleCommunityAnnouncement(@MessageBody() data: { communityId: string; announcement: string }) {
    this.server.to(data.communityId).emit('community_announcement', data);
  }

  @SubscribeMessage('broadcast_status_update')
  handleBroadcastStatusUpdate(@MessageBody() data: { listId: string; messageId: string; status: string }) {
    this.server.emit('broadcast_status_update', data);
  }

  // ---------------------------------------------------------
  // Business & CRM Events (Step 5)
  // ---------------------------------------------------------

  @SubscribeMessage('lead_created')
  handleLeadCreated(@MessageBody() data: { businessId: string; lead: any }) {
    this.server.to(`business_${data.businessId}`).emit('lead_created', data.lead);
  }

  @SubscribeMessage('agent_assigned')
  handleAgentAssigned(@MessageBody() data: { chatId: string; agentId: string }) {
    this.server.to(data.chatId).emit('agent_assigned', data);
    this.server.to(data.agentId).emit('new_chat_assigned', data);
  }

  @SubscribeMessage('chat_transferred')
  handleChatTransferred(@MessageBody() data: { chatId: string; fromAgentId: string; toAgentId: string }) {
    this.server.to(data.chatId).emit('chat_transferred', data);
    this.server.to(data.toAgentId).emit('new_chat_assigned', data);
  }

  @SubscribeMessage('internal_note_added')
  handleInternalNoteAdded(@MessageBody() data: { chatId: string; note: any }) {
    // Only agents should see this
    this.server.to(`agents_${data.chatId}`).emit('internal_note_added', data.note);
  }

  @SubscribeMessage('product_inquiry_created')
  handleProductInquiryCreated(@MessageBody() data: { businessId: string; inquiry: any }) {
    this.server.to(`business_${data.businessId}`).emit('product_inquiry_created', data.inquiry);
  }
}
