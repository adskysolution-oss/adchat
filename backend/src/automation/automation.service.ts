import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AutomationService {
  constructor(private prisma: PrismaService) {}

  async createRule(businessId: string, data: any) {
    return this.prisma.automationRule.create({
      data: {
        businessId,
        ...data,
      },
    });
  }

  async getRules(businessId: string) {
    return this.prisma.automationRule.findMany({
      where: { businessId },
    });
  }

  async toggleRule(ruleId: string, isActive: boolean) {
    return this.prisma.automationRule.update({
      where: { id: ruleId },
      data: { isActive },
    });
  }

  async handleIncomingMessage(businessId: string, message: string, chatId: string) {
    // Find matching keyword rules
    const rules = await this.prisma.automationRule.findMany({
      where: {
        businessId,
        isActive: true,
        trigger: 'KEYWORD',
      },
    });

    for (const rule of rules) {
      const condition = rule.condition as any;
      if (condition?.keywords?.some(kw => message.toLowerCase().includes(kw.toLowerCase()))) {
        return rule.action;
      }
    }

    // Handle Greeting/Away based on time
    // ... logic for greeting/away ...
    return null;
  }
}
