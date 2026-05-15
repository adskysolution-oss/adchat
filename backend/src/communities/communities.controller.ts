import { Controller, Post, Get, Delete, Body, Param, Req, Patch } from '@nestjs/common';
import { CommunitiesService } from './communities.service';

@Controller('communities')
export class CommunitiesController {
  constructor(private readonly communitiesService: CommunitiesService) {}

  @Post()
  async create(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.communitiesService.createCommunity(userId, data);
  }

  @Post(':id/groups/:chatId')
  async addGroup(@Param('id') id: string, @Param('chatId') chatId: string) {
    return this.communitiesService.addGroupToCommunity(id, chatId);
  }

  @Delete('groups/:chatId')
  async removeGroup(@Param('chatId') chatId: string) {
    return this.communitiesService.removeGroupFromCommunity(chatId);
  }

  @Post(':id/join')
  async join(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.communitiesService.joinCommunity(userId, id);
  }

  @Patch(':id/approve/:userId')
  async approve(@Param('id') id: string, @Param('userId') targetUserId: string, @Req() req: any) {
    const adminId = req.user?.id || 'demo-user-id';
    return this.communitiesService.approveMember(id, targetUserId, adminId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.communitiesService.getCommunityDetails(id);
  }
}
