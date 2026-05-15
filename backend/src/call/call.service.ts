import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CallType, CallStatus } from '@prisma/client';

@Injectable()
export class CallService {
  constructor(private prisma: PrismaService) {}

  async startCall(callerId: string, data: { type: CallType, chatId?: string, businessId?: string, participantIds: string[] }) {
    const call = await this.prisma.call.create({
      data: {
        type: data.type,
        callerId,
        chatId: data.chatId,
        businessId: data.businessId,
        status: CallStatus.INITIATED,
        participants: {
          create: [
            { userId: callerId, role: 'HOST', status: CallStatus.CONNECTED, joinedAt: new Date() },
            ...data.participantIds.map(userId => ({
              userId,
              role: 'PARTICIPANT',
              status: CallStatus.INITIATED,
            })),
          ],
        },
      },
      include: {
        participants: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
              }
            }
          }
        },
      },
    });

    return call;
  }

  async updateCallStatus(callId: string, status: CallStatus) {
    const data: any = { status };
    if (status === CallStatus.CONNECTED) {
      data.startTime = new Date();
    } else if ([CallStatus.ENDED, CallStatus.CANCELLED, CallStatus.REJECTED, CallStatus.FAILED].includes(status)) {
      data.endTime = new Date();
      // Calculate duration if startTime exists
      const call = await this.prisma.call.findUnique({ where: { id: callId } });
      if (call?.startTime) {
        data.duration = Math.floor((new Date().getTime() - call.startTime.getTime()) / 1000);
      }
    }

    return this.prisma.call.update({
      where: { id: callId },
      data,
    });
  }

  async updateParticipantStatus(callId: string, userId: string, status: CallStatus) {
    const updateData: any = { status };
    if (status === CallStatus.CONNECTED) {
      updateData.joinedAt = new Date();
    } else if (status === CallStatus.ENDED || status === CallStatus.REJECTED) {
      updateData.leftAt = new Date();
    }

    return this.prisma.callParticipant.update({
      where: {
        callId_userId: { callId, userId },
      },
      data: updateData,
    });
  }

  async getCallHistory(userId: string) {
    return this.prisma.call.findMany({
      where: {
        participants: {
          some: { userId },
        },
      },
      include: {
        participants: {
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
        notes: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addCallNote(callId: string, agentId: string, content: string, outcome?: string) {
    return this.prisma.callNote.create({
      data: {
        callId,
        agentId,
        content,
        outcome,
      },
    });
  }

  async getCallSettings(userId: string) {
    return this.prisma.callSettings.findUnique({
      where: { userId },
    });
  }

  async updateCallSettings(userId: string, data: any) {
    return this.prisma.callSettings.upsert({
      where: { userId },
      update: data,
      create: { ...data, userId },
    });
  }

  async deleteCallLog(callId: string) {
    return this.prisma.call.delete({
      where: { id: callId },
    });
  }
}
