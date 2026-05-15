import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ChatService {
  private logger = new Logger('ChatService');

  async updateUserOnlineStatus(userId: string, isOnline: boolean) {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          onlineStatus: isOnline ? 'ONLINE' : 'OFFLINE',
          lastSeen: isOnline ? null : new Date(),
        },
      });
    } catch (e) {
      this.logger.error(`Failed to update status for ${userId}: ${e.message}`);
    }
  }

  async createMessage(data: any) {
    // Basic implementation for saving a message
    return prisma.message.create({
      data: {
        chatId: data.chatId,
        senderId: data.senderId,
        type: data.type || 'TEXT',
        content: data.content,
        mediaUrl: data.mediaUrl,
        replyToId: data.replyToId,
        status: 'SENT',
      },
      include: {
        sender: {
          select: { id: true, firstName: true, lastName: true, profileImage: true }
        },
        replyTo: true
      }
    });
  }

  async updateMessageStatus(messageId: string, status: 'DELIVERED' | 'READ') {
    return prisma.message.update({
      where: { id: messageId },
      data: { status },
    });
  }

  async editMessage(data: { messageId: string; editorId: string; newContent: string; chatId: string }) {
    const message = await prisma.message.findUnique({ where: { id: data.messageId } });
    if (!message || message.senderId !== data.editorId) {
      throw new Error("Unauthorized to edit");
    }

    // Save edit history
    await prisma.messageEdit.create({
      data: {
        messageId: data.messageId,
        editorId: data.editorId,
        oldContent: message.content,
        newContent: data.newContent
      }
    });

    return prisma.message.update({
      where: { id: data.messageId },
      data: { content: data.newContent, isEdited: true },
      include: { sender: { select: { id: true, firstName: true, profileImage: true } } }
    });
  }

  async deleteMessage(data: { messageId: string; userId: string; forEveryone: boolean }) {
    const message = await prisma.message.findUnique({ where: { id: data.messageId } });
    if (!message) return;

    if (data.forEveryone) {
      if (message.senderId !== data.userId) throw new Error("Unauthorized to delete for everyone");
      return prisma.message.update({
        where: { id: data.messageId },
        data: { isDeleted: true, content: null, mediaUrl: null },
      });
    } else {
      // Delete for me
      return prisma.message.update({
        where: { id: data.messageId },
        data: {
          deletedFor: { push: data.userId }
        }
      });
    }
  }

  async addReaction(data: { messageId: string; userId: string; emoji: string }) {
    // Upsert reaction to prevent multiple emojis from same user on same message
    return prisma.reaction.upsert({
      where: {
        messageId_userId: {
          messageId: data.messageId,
          userId: data.userId,
        }
      },
      update: { emoji: data.emoji },
      create: {
        messageId: data.messageId,
        userId: data.userId,
        emoji: data.emoji,
      }
    });
  }

  async getChatList(userId: string) {
    return prisma.chatParticipant.findMany({
      where: { userId },
      include: {
        chat: {
          include: {
            messages: {
              orderBy: { createdAt: 'desc' },
              take: 1
            },
            participants: {
              where: { userId: { not: userId } },
              include: { user: { select: { id: true, firstName: true, lastName: true, profileImage: true, onlineStatus: true } } }
            }
          }
        }
      },
      orderBy: { chat: { updatedAt: 'desc' } }
    });
  }

  async getChatHistory(chatId: string, userId: string) {
    return prisma.message.findMany({
      where: { 
        chatId,
        NOT: {
          deletedFor: { has: userId }
        }
      },
      orderBy: { createdAt: 'asc' },
      include: {
        sender: { select: { id: true, firstName: true, profileImage: true } },
        replyTo: true,
        reactions: true
      }
    });
  }

  // ---------------------------------------------------------
  // Business Chat Logic
  // ---------------------------------------------------------

  async assignChatToAgent(data: { chatId: string; agentId: string }) {
    return prisma.businessChatAssignment.create({
      data: {
        chatId: data.chatId,
        agentId: data.agentId,
        status: "ACTIVE"
      }
    });
  }

  async transferChat(data: { chatId: string; fromAgentId: string; toAgentId: string }) {
    // Deactivate old assignment
    await prisma.businessChatAssignment.updateMany({
      where: { chatId: data.chatId, agentId: data.fromAgentId, status: "ACTIVE" },
      data: { status: "TRANSFERRED" }
    });

    // Create new assignment
    return this.assignChatToAgent({ chatId: data.chatId, agentId: data.toAgentId });
  }

  async addInternalNote(data: { chatId: string; agentId: string; content: string }) {
    return prisma.internalNote.create({
      data: {
        chatId: data.chatId,
        agentId: data.agentId,
        content: data.content
      }
    });
  }
}
