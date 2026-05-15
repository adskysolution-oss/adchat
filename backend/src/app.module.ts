import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { CallsModule } from './calls/calls.module';
import { MediaModule } from './media/media.module';
import { StatusModule } from './status/status.module';
import { BusinessModule } from './business/business.module';
import { PowerModule } from './power/power.module';
import { AdminModule } from './admin/admin.module';
import { ChannelsModule } from './channels/channels.module';
import { CommunitiesModule } from './communities/communities.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import { CatalogModule } from './catalog/catalog.module';
import { CrmModule } from './crm/crm.module';
import { CallModule } from './call/call.module';
import { MarketingModule } from './marketing/marketing.module';
import { AutomationModule } from './automation/automation.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { BullModule } from '@nestjs/bullmq';
import { NotificationModule } from './notification/notification.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT) || 6379,
      },
    }),
    AuthModule,
    UsersModule,
    ChatModule,
    CallsModule,
    MediaModule,
    StatusModule,
    BusinessModule,
    PowerModule,
    AdminModule,
    ChannelsModule,
    CommunitiesModule,
    BroadcastModule,
    CatalogModule,
    CrmModule,
    CallModule,
    MarketingModule,
    AutomationModule,
    ChatbotModule,
    NotificationModule,
    SubscriptionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
