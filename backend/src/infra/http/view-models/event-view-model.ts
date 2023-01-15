import { Event } from "src/app/entities/event";

export class EventViewModel {
  static toHTTP(event: Event) {
    return {
      id: event.id,
      date: event.date.value,
      title: event.title,
      description: event.description,
      createAt: event.createAt,
      canceledAt: event.canceledAt,
    };
  }
}