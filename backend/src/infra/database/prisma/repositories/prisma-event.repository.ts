import { Injectable } from '@nestjs/common';
import { EventRepository } from 'src/app/repositories/event.repository';
import { PrismaService } from '../prisma.service';
import { Event } from 'src/app/entities/event';
import { PrismaEventMapper } from '../mappers/prisma-event.mapper';

@Injectable()
export class PrismaEventRepository implements EventRepository {
  constructor(private prismaService: PrismaService) {}

  async findAll(): Promise<Event[]> {
    const events = await this.prismaService.tb_events.findMany();
    return events.map(PrismaEventMapper.toDomain);
  }

  async findById(id: string): Promise<Event> {
    const event = await this.prismaService.tb_events.findFirst({
      where: {id,}
    });
    if (!event) throw new Error(`Event not found.`);
    return PrismaEventMapper.toDomain(event);
  }

  async findByDate(date: Date): Promise<Event[]> {
    const events = await this.prismaService.tb_events.findMany({
      where: {
        date: {
          gte: new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1),
          lte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        }
      }
    });
    return events.map(PrismaEventMapper.toDomain);
  }

  async findByPeriod(year: number, month: number): Promise<Event[] | null> {
    const initDate = new Date(year, month, 0);
    const finDate = new Date(year, month + 1, 0);
    const events = await this.prismaService.tb_events.findMany({
      where: {
        date: {
          gte: initDate,
          lt: finDate,
        }
      },
    });
    return events.map(PrismaEventMapper.toDomain);
  }

  async create(event: Event): Promise<Event> {
    const eventCreated = await this.prismaService.tb_events.create({
      data: {
        id: event.id,
        date: event.date.value,
        title: event.title,
        description: event.description,
      },
    });
    return PrismaEventMapper.toDomain(eventCreated);
  }

  async update(event: Event): Promise<Event> {
    const eventUpdate = await this.prismaService.tb_events.findFirst({
      where: {
        id: event.id,
      }
    });
    if (!eventUpdate) throw new Error(`Event not found.`);
    const eventTemp = await this.prismaService.tb_events.update({
      data: {
        date: event.date.value,
        title: event.title,
        description: event.description,
      },
      where: {
        id: event.id,
      },
    });
    return PrismaEventMapper.toDomain(eventTemp);
  }

  async delete(id: string): Promise<void> {
    const eventDelete = await this.prismaService.tb_events.findFirst({
      where: {
        id,
      }
    });
    if (!eventDelete) throw new Error(`Event not found.`);
    await this.prismaService.tb_events.delete({
      where: {id,},
    });
  }
}
