import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { PrismaService } from '../prisma/prisma.service';
import { MessageStatus } from '@prisma/client';
import { Logger } from '@nestjs/common';

@Processor('broadcast')
export class BroadcastWorker extends WorkerHost {
  private readonly logger = new Logger(BroadcastWorker.name);

  constructor(private prisma: PrismaService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { broadcastMessageId, recipientIds, senderId } = job.data;
    this.logger.log(`Processing broadcast ${broadcastMessageId} for ${recipientIds.length} recipients`);

    for (const recipientId of recipientIds) {
      try {
        // In a real app, this would trigger a push notification or a real-time message event
        await this.prisma.broadcastReport.create({
          data: {
            broadcastMessageId,
            recipientId,
            status: MessageStatus.SENT,
          },
        });
      } catch (error) {
        this.logger.error(`Failed to deliver broadcast to ${recipientId}: ${error.message}`);
      }
    }

    return { success: true };
  }
}
