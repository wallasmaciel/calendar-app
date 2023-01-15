import { Event, EventDate } from 'src/app/entities/event';
import { tb_events as RawEvent } from "@prisma/client";

export class PrismaEventMapper {
  static toPrisma(event: Event): RawEvent {
    return {
      id: event.id,
      date: event.date.value,
      title: event.title,
      description: event.description,
      createAt: event.createAt,
      canceledAt: event.canceledAt,
    };
  }

  static toDomain(event: RawEvent): Event {
    return new Event({
      date: new EventDate(event.date),
      title: event.title,
      description: event.description,
      createAt: event.createAt,
      canceledAt: event.canceledAt,
    }, event.id);
  }
}