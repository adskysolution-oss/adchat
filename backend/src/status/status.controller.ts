import { Controller, Post, Get, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async create(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id'; // Mock user ID for now
    return this.statusService.createStatus(userId, data);
  }

  @Get()
  async findAll(@Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.statusService.getStatuses(userId);
  }

  @Post(':id/view')
  async view(@Param('id') id: string, @Body('isSecretView') isSecretView: boolean, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.statusService.viewStatus(userId, id, isSecretView);
  }

  @Post(':id/react')
  async react(@Param('id') id: string, @Body('emoji') emoji: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.statusService.reactToStatus(userId, id, emoji);
  }

  @Post(':id/reply')
  async reply(@Param('id') id: string, @Body('message') message: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.statusService.replyToStatus(userId, id, message);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.statusService.deleteStatus(userId, id);
  }
}
