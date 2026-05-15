import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { MessageType } from '@prisma/client';

@Injectable()
export class BroadcastService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('broadcast') private broadcastQueue: Queue,
  ) {}

  async createBroadcastList(userId: string, data: any) {
    return this.prisma.broadcastList.create({
      data: {
        name: data.name,
        userId,
        recipients: {
          create: data.recipientIds.map((id: string) => ({
            userId: id,
          })),
        },
      },
    });
  }

  async sendBroadcast(userId: string, listId: string, data: any) {
    // 1. Verify ownership
    const list = await this.prisma.broadcastList.findUnique({
      where: { id: listId },
      include: { recipients: true },
    });

    if (!list || list.userId !== userId) {
      throw new Error('Unauthorized');
    }

    // 2. Create broadcast message record
    const broadcastMessage = await this.prisma.broadcastMessage.create({
      data: {
        broadcastListId: listId,
        type: data.type || MessageType.TEXT,
        content: data.content,
        mediaUrl: data.mediaUrl,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      },
    });

    // 3. Queue the delivery
    if (!data.scheduledAt) {
      await this.broadcastQueue.add('deliver', {
        broadcastMessageId: broadcastMessage.id,
        recipientIds: list.recipients.map(r => r.userId),
        senderId: userId,
      });
    }

    return broadcastMessage;
  }

  async getBroadcastAnalytics(listId: string) {
    return this.prisma.broadcastReport.groupBy({
      by: ['status'],
      where: {
        broadcastMessage: {
          broadcastListId: listId,
        },
      },
      _count: true,
    });
  }
}
