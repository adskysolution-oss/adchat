import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LeadStatus } from '@prisma/client';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  async createLead(businessId: string, data: any) {
    const lead = await this.prisma.lead.create({
      data: {
        businessId,
        name: data.name,
        phoneNumber: data.phoneNumber,
        email: data.email,
        company: data.company,
        requirement: data.requirement,
        value: data.value,
        source: data.source || 'CHAT',
        assignedToId: data.assignedToId,
      },
    });

    // Add to timeline
    await this.prisma.leadTimeline.create({
      data: {
        leadId: lead.id,
        action: 'CREATED',
        details: `Lead created from ${lead.source}`,
      },
    });

    return lead;
  }

  async getLeads(businessId: string, status?: LeadStatus) {
    return this.prisma.lead.findMany({
      where: {
        businessId,
        ...(status && { status }),
      },
      include: {
        labels: true,
        assignedTo: {
          select: { id: true, firstName: true, lastName: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateLeadStatus(leadId: string, status: LeadStatus, agentId: string) {
    const lead = await this.prisma.lead.update({
      where: { id: leadId },
      data: { status },
    });

    await this.prisma.leadTimeline.create({
      data: {
        leadId,
        action: 'STATUS_UPDATED',
        details: `Status changed to ${status}`,
        agentId,
      },
    });

    return lead;
  }

  async addNote(leadId: string, agentId: string, content: string) {
    return this.prisma.leadNote.create({
      data: {
        leadId,
        agentId,
        content,
      },
    });
  }

  async setReminder(leadId: string, remindAt: Date) {
    return this.prisma.followUpReminder.create({
      data: {
        leadId,
        remindAt,
      },
    });
  }

  async getLeadHistory(leadId: string) {
    return this.prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        notes: true,
        timeline: {
          orderBy: { createdAt: 'desc' },
        },
        reminders: true,
      },
    });
  }
}
