import { Event } from "src/app/entities/event";
import { BaseRepository } from "./base.repository";

export abstract class EventRepository extends BaseRepository<Event> {
  abstract findByDate(date: Date): Promise<Event[]>;
  abstract findByPeriod(year: number, month: number): Promise<Event[] | null>;
}
