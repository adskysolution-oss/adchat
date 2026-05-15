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

@Module({
  imports: [AuthModule, UsersModule, ChatModule, CallsModule, MediaModule, StatusModule, BusinessModule, PowerModule, AdminModule, ChannelsModule, CommunitiesModule, BroadcastModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
