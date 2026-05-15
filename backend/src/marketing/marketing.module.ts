import { Module } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { MarketingController } from './marketing.controller';
import { BullModule } from '@nestjs/bullmq';
import { PrismaModule } from '../prisma/prisma.module';
import { CampaignProcessor } from './campaign.processor';

@Module({
  imports: [
    PrismaModule,
    BullModule.registerQueue({
      name: 'campaign_queue',
    }),
  ],
  controllers: [MarketingController],
  providers: [MarketingService, CampaignProcessor],
  exports: [MarketingService],
})
export class MarketingModule {}
