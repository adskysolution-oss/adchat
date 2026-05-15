import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private prisma: PrismaService) {}

  async createProfile(userId: string, data: any) {
    return this.prisma.businessProfile.create({
      data: {
        userId,
        businessName: data.businessName,
        category: data.category,
        email: data.email,
        website: data.website,
        address: data.address,
        workingHours: data.workingHours,
        gstNumber: data.gstNumber,
      },
    });
  }

  async getProfile(userId: string) {
    return this.prisma.businessProfile.findUnique({
      where: { userId },
      include: {
        branches: true,
        agents: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
        },
      },
    });
  }

  async addBranch(businessId: string, data: any) {
    return this.prisma.businessBranch.create({
      data: {
        businessId,
        name: data.name,
        address: data.address,
        mapLocation: data.mapLocation,
        phoneNumber: data.phoneNumber,
      },
    });
  }

  async addAgent(businessId: string, userId: string, role: string = 'AGENT') {
    return this.prisma.businessAgent.create({
      data: {
        businessId,
        userId,
        role,
      },
    });
  }

  async updateSettings(businessId: string, data: any) {
    return this.prisma.businessProfile.update({
      where: { id: businessId },
      data: {
        greetingMessage: data.greetingMessage,
        awayMessage: data.awayMessage,
      },
    });
  }
}
