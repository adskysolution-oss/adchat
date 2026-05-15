import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('list/:userId')
  async getChatList(@Param('userId') userId: string) {
    return this.chatService.getChatList(userId);
  }

  @Get('history/:chatId')
  async getChatHistory(@Param('chatId') chatId: string, @Query('userId') userId: string) {
    // In a real app, verify user is in chat
    return this.chatService.getChatHistory(chatId, userId);
  }

  @Post('assign')
  async assignChat(@Body() data: { chatId: string; agentId: string }) {
    return this.chatService.assignChatToAgent(data);
  }

  @Post('transfer')
  async transferChat(@Body() data: { chatId: string; fromAgentId: string; toAgentId: string }) {
    return this.chatService.transferChat(data);
  }

  @Post('note')
  async addInternalNote(@Body() data: { chatId: string; agentId: string; content: string }) {
    return this.chatService.addInternalNote(data);
  }
}
