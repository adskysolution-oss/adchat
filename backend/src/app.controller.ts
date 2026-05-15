import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    // Check DB
    const db = await this.prisma.$queryRaw`SELECT 1`.then(() => 'UP').catch(() => 'DOWN');
    
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      services: {
        database: db,
        server: 'UP',
      },
    };
  }
}
