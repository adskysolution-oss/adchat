import { Controller, Post, Get, Body, Param, Req, Patch, Query } from '@nestjs/common';
import { CrmService } from './crm.service';
import { LeadStatus } from '@prisma/client';

@Controller('crm')
export class CrmController {
  constructor(private readonly crmService: CrmService) {}

  @Post('leads')
  async create(@Body() data: any) {
    return this.crmService.createLead(data.businessId, data);
  }

  @Get('leads/:businessId')
  async findAll(@Param('businessId') businessId: string, @Query('status') status?: LeadStatus) {
    return this.crmService.getLeads(businessId, status);
  }

  @Patch('leads/:id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: LeadStatus, @Req() req: any) {
    const agentId = req.user?.id || 'demo-agent-id';
    return this.crmService.updateLeadStatus(id, status, agentId);
  }

  @Post('leads/:id/notes')
  async addNote(@Param('id') id: string, @Body('content') content: string, @Req() req: any) {
    const agentId = req.user?.id || 'demo-agent-id';
    return this.crmService.addNote(id, agentId, content);
  }

  @Post('leads/:id/reminder')
  async setReminder(@Param('id') id: string, @Body('remindAt') remindAt: string) {
    return this.crmService.setReminder(id, new Date(remindAt));
  }

  @Get('leads/:id/history')
  async getHistory(@Param('id') id: string) {
    return this.crmService.getLeadHistory(id);
  }
}
