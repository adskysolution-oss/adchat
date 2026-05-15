import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ParticipantRole } from '@prisma/client';

@Injectable()
export class CommunitiesService {
  constructor(private prisma: PrismaService) {}

  async createCommunity(userId: string, data: any) {
    return this.prisma.community.create({
      data: {
        name: data.name,
        description: data.description,
        avatarUrl: data.avatarUrl,
        isPublic: data.isPublic !== undefined ? data.isPublic : true,
        rules: data.rules,
        ownerId: userId,
        members: {
          create: {
            userId,
            role: ParticipantRole.ADMIN,
            isApproved: true,
          },
        },
      },
    });
  }

  async addGroupToCommunity(communityId: string, chatId: string) {
    return this.prisma.chat.update({
      where: { id: chatId },
      data: { communityId },
    });
  }

  async removeGroupFromCommunity(chatId: string) {
    return this.prisma.chat.update({
      where: { id: chatId },
      data: { communityId: null },
    });
  }

  async joinCommunity(userId: string, communityId: string) {
    const community = await this.prisma.community.findUnique({
      where: { id: communityId },
    });

    return this.prisma.communityMember.create({
      data: {
        communityId,
        userId,
        isApproved: community?.isPublic || false,
      },
    });
  }

  async approveMember(communityId: string, userId: string, adminId: string) {
    // Verify adminId is an admin
    const admin = await this.prisma.communityMember.findUnique({
      where: {
        communityId_userId: {
          communityId,
          userId: adminId,
        },
      },
    });

    if (!admin || admin.role !== ParticipantRole.ADMIN) {
      throw new Error('Unauthorized to approve members');
    }

    return this.prisma.communityMember.update({
      where: {
        communityId_userId: {
          communityId,
          userId,
        },
      },
      data: { isApproved: true },
    });
  }

  async getCommunityDetails(communityId: string) {
    return this.prisma.community.findUnique({
      where: { id: communityId },
      include: {
        groups: true,
        _count: {
          select: { members: true },
        },
      },
    });
  }
}
