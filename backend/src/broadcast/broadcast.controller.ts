import { Controller, Post, Get, Body, Param, Req } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';

@Controller('broadcast')
export class BroadcastController {
  constructor(private readonly broadcastService: BroadcastService) {}

  @Post('list')
  async createList(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.broadcastService.createBroadcastList(userId, data);
  }

  @Post('list/:id/send')
  async send(@Param('id') id: string, @Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.broadcastService.sendBroadcast(userId, id, data);
  }

  @Get('list/:id/analytics')
  async getAnalytics(@Param('id') id: string) {
    return this.broadcastService.getBroadcastAnalytics(id);
  }
}
