import { Module } from '@nestjs/common';
import { BroadcastService } from './broadcast.service';
import { BroadcastController } from './broadcast.controller';
import { BroadcastWorker } from './broadcast.worker';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'broadcast',
    }),
  ],
  controllers: [BroadcastController],
  providers: [BroadcastService, BroadcastWorker],
})
export class BroadcastModule {}
