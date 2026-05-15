import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { CampaignStatus } from '@prisma/client';

@Processor('campaign_queue')
export class CampaignProcessor extends WorkerHost {
  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    if (job.name === 'execute_campaign') {
      const { campaignId } = job.data;
      await this.executeCampaign(campaignId);
    }
  }

  private async executeCampaign(campaignId: string) {
    const campaign = await this.prisma.campaign.findUnique({
      where: { id: campaignId },
    });

    if (!campaign) return;

    // Fetch audience based on filter
    // This is a simplified version. In production, we'd query contacts by labels/status.
    const contacts = await this.prisma.contact.findMany({
      where: {
        businessId: campaign.businessId,
        consentStatus: 'OPTED_IN',
        // Apply more filters here based on campaign.audienceFilter
      },
    });

    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: { totalRecipients: contacts.length },
    });

    for (const contact of contacts) {
      try {
        // Mock sending message
        // In real app, call WhatsApp/SMS API here
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate delay

        await this.prisma.campaignMessage.create({
          data: {
            campaignId,
            recipientId: contact.id,
            status: 'SENT',
            sentAt: new Date(),
          },
        });

        await this.prisma.campaign.update({
          where: { id: campaignId },
          data: { sentCount: { increment: 1 } },
        });
      } catch (error) {
        await this.prisma.campaignMessage.create({
          data: {
            campaignId,
            recipientId: contact.id,
            status: 'FAILED',
            error: error.message,
          },
        });
        await this.prisma.campaign.update({
          where: { id: campaignId },
          data: { failedCount: { increment: 1 } },
        });
      }
    }

    await this.prisma.campaign.update({
      where: { id: campaignId },
      data: { status: CampaignStatus.COMPLETED, completedAt: new Date() },
    });
  }
}
