import { Controller, Post, Get, Delete, Body, Param, Req } from '@nestjs/common';
import { ChannelsService } from './channels.service';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  async create(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.createChannel(userId, data);
  }

  @Post(':id/follow')
  async follow(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.followChannel(userId, id);
  }

  @Delete(':id/follow')
  async unfollow(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.unfollowChannel(userId, id);
  }

  @Post(':id/posts')
  async createPost(@Param('id') id: string, @Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.postToChannel(userId, id, data);
  }

  @Get('recommended')
  async getRecommended() {
    return this.channelsService.getRecommendedChannels();
  }

  @Post('posts/:postId/react')
  async react(@Param('postId') postId: string, @Body('emoji') emoji: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.reactToPost(userId, postId, emoji);
  }

  @Post('posts/:postId/reply')
  async reply(@Param('postId') postId: string, @Body('message') message: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.channelsService.replyToPost(userId, postId, message);
  }
}
