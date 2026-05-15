import { Controller, Post, Get, Body, Param, Req, Patch } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post('profile')
  async createProfile(@Body() data: any, @Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.businessService.createProfile(userId, data);
  }

  @Get('profile')
  async getProfile(@Req() req: any) {
    const userId = req.user?.id || 'demo-user-id';
    return this.businessService.getProfile(userId);
  }

  @Post('branch')
  async addBranch(@Body() data: any) {
    // In real app, verify businessId ownership
    return this.businessService.addBranch(data.businessId, data);
  }

  @Post('agent')
  async addAgent(@Body() data: any) {
    return this.businessService.addAgent(data.businessId, data.userId, data.role);
  }

  @Patch('settings')
  async updateSettings(@Body() data: any) {
    return this.businessService.updateSettings(data.businessId, data);
  }
}
