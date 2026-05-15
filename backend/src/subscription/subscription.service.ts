import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export enum UserTier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  BIZ_BASIC = 'BIZ_BASIC',
  BIZ_PRO = 'BIZ_PRO',
  ENTERPRISE = 'ENTERPRISE'
}

const TIER_LIMITS = {
  [UserTier.FREE]: { maxGroups: 5, maxBroadcasts: 0, campaignLimit: 0, agentLimit: 0 },
  [UserTier.PREMIUM]: { maxGroups: 50, maxBroadcasts: 5, campaignLimit: 0, agentLimit: 0 },
  [UserTier.BIZ_BASIC]: { maxGroups: 100, maxBroadcasts: 20, campaignLimit: 5, agentLimit: 2 },
  [UserTier.BIZ_PRO]: { maxGroups: 500, maxBroadcasts: 100, campaignLimit: 50, agentLimit: 10 },
  [UserTier.ENTERPRISE]: { maxGroups: 9999, maxBroadcasts: 9999, campaignLimit: 9999, agentLimit: 9999 },
};

@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async getUserTier(userId: string): Promise<UserTier> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    return (user?.tier as UserTier) || UserTier.FREE;
  }

  async checkLimit(userId: string, feature: keyof typeof TIER_LIMITS[UserTier.FREE]) {
    const tier = await this.getUserTier(userId);
    const limits = TIER_LIMITS[tier];
    
    // Count current usage (example for groups)
    if (feature === 'maxGroups') {
      const count = await this.prisma.chat.count({
        where: { type: 'GROUP', participants: { some: { userId } } }
      });
      if (count >= limits.maxGroups) throw new ForbiddenException('Upgrade to increase group limit');
    }

    return true;
  }

  async updateTier(userId: string, tier: UserTier) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { tier },
    });
  }
}
