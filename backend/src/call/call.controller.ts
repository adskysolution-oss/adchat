import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { CallService } from './call.service';
import { CallType, CallStatus } from '@prisma/client';

@Controller('calls')
export class CallController {
  constructor(private readonly callService: CallService) {}

  @Post('start')
  async startCall(@Request() req, @Body() data: { type: CallType, chatId?: string, businessId?: string, participantIds: string[] }) {
    // In a real app, req.user.id would be used. Using a demo ID for now.
    const userId = req.user?.id || 'demo-user-id';
    return this.callService.startCall(userId, data);
  }

  @Get('history')
  async getHistory(@Request() req) {
    const userId = req.user?.id || 'demo-user-id';
    return this.callService.getCallHistory(userId);
  }

  @Post(':id/note')
  async addNote(@Request() req, @Param('id') callId: string, @Body() data: { content: string, outcome?: string }) {
    const userId = req.user?.id || 'demo-user-id';
    return this.callService.addCallNote(callId, userId, data.content, data.outcome);
  }

  @Get('settings')
  async getSettings(@Request() req) {
    const userId = req.user?.id || 'demo-user-id';
    return this.callService.getCallSettings(userId);
  }

  @Put('settings')
  async updateSettings(@Request() req, @Body() data: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.callService.updateCallSettings(userId, data);
  }

  @Delete(':id')
  async deleteLog(@Param('id') id: string) {
    return this.callService.deleteCallLog(id);
  }
}
