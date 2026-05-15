import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PowerService {
  constructor(private prisma: PrismaService) {}

  async scheduleMessage(userId: string, data: any) {
    return this.prisma.scheduledMessage.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async setAutoReply(userId: string, data: any) {
    return this.prisma.personalAutoReply.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async getScheduledMessages(userId: string) {
    return this.prisma.scheduledMessage.findMany({
      where: { userId },
      orderBy: { scheduledAt: 'asc' },
    });
  }
}
