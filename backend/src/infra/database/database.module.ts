import { PrismaEventRepository } from './prisma/repositories/prisma-event.repository';
import { EventRepository } from 'src/app/repositories/event.repository';
import { Module } from "@nestjs/common";
import { PrismaService } from './prisma/prisma.service';

@Module({
  providers: [
    PrismaService,
    {
      provide: EventRepository,
      useClass: PrismaEventRepository,
    },
  ],
  exports: [EventRepository],
})
export class DatabaseModule {}