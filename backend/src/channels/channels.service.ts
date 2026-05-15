import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MessageType, ParticipantRole } from '@prisma/client';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async createChannel(userId: string, data: any) {
    return this.prisma.channel.create({
      data: {
        name: data.name,
        description: data.description,
        iconUrl: data.iconUrl,
        isPublic: data.isPublic !== undefined ? data.isPublic : true,
        category: data.category,
        ownerId: userId,
        members: {
          create: {
            userId,
            role: ParticipantRole.ADMIN,
          },
        },
      },
    });
  }

  async followChannel(userId: string, channelId: string) {
    return this.prisma.channelMember.upsert({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
      update: {},
      create: {
        channelId,
        userId,
        role: ParticipantRole.MEMBER,
      },
    });
  }

  async unfollowChannel(userId: string, channelId: string) {
    return this.prisma.channelMember.deleteMany({
      where: {
        channelId,
        userId,
      },
    });
  }

  async postToChannel(userId: string, channelId: string, data: any) {
    // Verify user is admin/moderator
    const member = await this.prisma.channelMember.findUnique({
      where: {
        channelId_userId: {
          channelId,
          userId,
        },
      },
    });

    if (!member || (member.role !== ParticipantRole.ADMIN && member.role !== ParticipantRole.MODERATOR)) {
      throw new Error('Unauthorized to post in this channel');
    }

    return this.prisma.channelPost.create({
      data: {
        channelId,
        type: data.type || MessageType.TEXT,
        content: data.content,
        mediaUrl: data.mediaUrl,
        mediaSize: data.mediaSize,
        mediaMimeType: data.mediaMimeType,
      },
    });
  }

  async getRecommendedChannels() {
    return this.prisma.channel.findMany({
      where: { isPublic: true },
      take: 10,
      orderBy: { members: { _count: 'desc' } },
      include: {
        _count: {
          select: { members: true },
        },
      },
    });
  }

  async reactToPost(userId: string, postId: string, emoji: string) {
    return this.prisma.channelPostReaction.upsert({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
      update: {
        emoji,
      },
      create: {
        postId,
        userId,
        emoji,
      },
    });
  }

  async replyToPost(userId: string, postId: string, message: string) {
    return this.prisma.channelPostReply.create({
      data: {
        postId,
        userId,
        message,
      },
    });
  }
}
