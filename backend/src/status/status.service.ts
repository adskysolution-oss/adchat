import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MessageType, StatusPrivacyType } from '@prisma/client';

@Injectable()
export class StatusService {
  private readonly logger = new Logger(StatusService.name);

  constructor(private prisma: PrismaService) {}

  async createStatus(userId: string, data: any) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    return this.prisma.statusUpdate.create({
      data: {
        userId,
        type: data.type || MessageType.TEXT,
        mediaUrl: data.mediaUrl,
        caption: data.caption,
        backgroundColor: data.backgroundColor,
        linkUrl: data.linkUrl,
        productId: data.productId,
        offerDetails: data.offerDetails,
        privacyType: data.privacyType || StatusPrivacyType.EVERYONE,
        privacyUsers: data.privacyUsers || [],
        expiresAt,
        scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
      },
    });
  }

  async getStatuses(userId: string) {
    // Basic implementation: get statuses from contacts
    // In a real app, this would involve complex privacy filtering
    const contacts = await this.prisma.contact.findMany({
      where: { userId },
      select: { contactId: true },
    });

    const contactIds = contacts.map(c => c.contactId);
    contactIds.push(userId); // Include own status

    return this.prisma.statusUpdate.findMany({
      where: {
        userId: { in: contactIds },
        expiresAt: { gt: new Date() },
        isArchived: false,
        OR: [
            { scheduledAt: null },
            { scheduledAt: { lte: new Date() } }
        ]
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
          },
        },
        views: true,
        reactions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async viewStatus(userId: string, statusId: string, isSecretView: boolean = false) {
    return this.prisma.statusView.upsert({
      where: {
        statusId_viewerId: {
          statusId,
          viewerId: userId,
        },
      },
      update: {
        viewedAt: new Date(),
        isSecretView,
      },
      create: {
        statusId,
        viewerId: userId,
        isSecretView,
      },
    });
  }

  async reactToStatus(userId: string, statusId: string, emoji: string) {
    return this.prisma.statusReaction.upsert({
      where: {
        statusId_userId: {
          statusId,
          userId,
        },
      },
      update: {
        emoji,
      },
      create: {
        statusId,
        userId,
        emoji,
      },
    });
  }

  async replyToStatus(userId: string, statusId: string, message: string) {
    return this.prisma.statusReply.create({
      data: {
        statusId,
        userId,
        message,
      },
    });
  }

  async deleteStatus(userId: string, statusId: string) {
    return this.prisma.statusUpdate.deleteMany({
      where: {
        id: statusId,
        userId,
      },
    });
  }

  @Cron(CronExpression.EVERY_HOUR)
  async handleAutoExpiry() {
    this.logger.log('Running status auto-expiry job...');
    const result = await this.prisma.statusUpdate.updateMany({
      where: {
        expiresAt: { lte: new Date() },
        isArchived: false,
      },
      data: {
        isArchived: true,
      },
    });
    this.logger.log(`Archived ${result.count} expired statuses.`);
  }
}
