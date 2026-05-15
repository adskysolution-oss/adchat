import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignType, CampaignStatus } from '@prisma/client';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class MarketingService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('campaign_queue') private campaignQueue: Queue
  ) {}

  // --- Templates ---
  async createTemplate(businessId: string, data: any) {
    return this.prisma.messageTemplate.create({
      data: {
        businessId,
        ...data,
        buttons: {
          create: data.buttons || [],
        },
      },
    });
  }

  async getTemplates(businessId: string) {
    return this.prisma.messageTemplate.findMany({
      where: { businessId },
      include: { buttons: true },
    });
  }

  // --- Campaigns ---
  async createCampaign(businessId: string, data: any) {
    return this.prisma.campaign.create({
      data: {
        businessId,
        ...data,
      },
    });
  }

  async startCampaign(campaignId: string) {
    const campaign = await this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status: CampaignStatus.RUNNING, startedAt: new Date() },
    });

    // Add to BullMQ queue
    await this.campaignQueue.add('execute_campaign', { campaignId });
    
    return campaign;
  }

  async getCampaigns(businessId: string) {
    return this.prisma.campaign.findMany({
      where: { businessId },
      include: { template: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCampaignAnalytics(campaignId: string) {
    return this.prisma.campaign.findUnique({
      where: { id: campaignId },
      include: {
        messages: {
          take: 100,
          orderBy: { createdAt: 'desc' },
        },
        reports: true,
      },
    });
  }

  // --- Contacts & Consent ---
  async importContacts(businessId: string, contacts: any[]) {
    // Bulk create/update
    for (const contact of contacts) {
      await this.prisma.contact.upsert({
        where: {
          businessId_phoneNumber: {
            businessId,
            phoneNumber: contact.phoneNumber,
          },
        },
        update: { ...contact },
        create: { businessId, ...contact },
      });
    }
    return { success: true, count: contacts.length };
  }

  async updateConsent(businessId: string, phoneNumber: string, status: string) {
    return this.prisma.contact.update({
      where: {
        businessId_phoneNumber: { businessId, phoneNumber },
      },
      data: {
        consentStatus: status,
        consentDate: new Date(),
      },
    });
  }
}
