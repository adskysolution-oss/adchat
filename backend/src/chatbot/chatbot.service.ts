import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatbotService {
  constructor(private prisma: PrismaService) {}

  async createFlow(businessId: string, data: any) {
    return this.prisma.chatbotFlow.create({
      data: {
        businessId,
        name: data.name,
        nodes: {
          create: data.nodes,
        },
        edges: {
          create: data.edges,
        },
      },
    });
  }

  async getFlows(businessId: string) {
    return this.prisma.chatbotFlow.findMany({
      where: { businessId },
      include: { nodes: true, edges: true },
    });
  }

  async startSession(flowId: string, userId: string, chatId: string) {
    const flow = await this.prisma.chatbotFlow.findUnique({
      where: { id: flowId },
      include: { nodes: true },
    });

    const startNode = flow.nodes.find(n => (n.data as any).isStart);

    return this.prisma.chatbotSession.create({
      data: {
        flowId,
        userId,
        chatId,
        currentNodeId: startNode?.id,
        status: 'ACTIVE',
      },
    });
  }

  async processInput(sessionId: string, input: string) {
    const session = await this.prisma.chatbotSession.findUnique({
      where: { id: sessionId },
      include: { 
        flow: { 
          include: { nodes: true, edges: true } 
        } 
      },
    });

    if (!session || session.status !== 'ACTIVE') return null;

    const currentNode = session.flow.nodes.find(n => n.id === session.currentNodeId);
    
    // Logic to find next node based on edges and input
    const edge = session.flow.edges.find(e => 
      e.sourceId === session.currentNodeId && 
      (!e.label || e.label.toLowerCase() === input.toLowerCase())
    );

    if (edge) {
      const nextNode = session.flow.nodes.find(n => n.id === e.targetId);
      await this.prisma.chatbotSession.update({
        where: { id: sessionId },
        data: { currentNodeId: nextNode.id },
      });
      return nextNode;
    }

    return null;
  }
}
