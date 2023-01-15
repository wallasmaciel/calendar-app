import { randomUUID } from "crypto";
import { Replace } from "src/helpers/replace";

export class EventError extends Error {

}
export class EventDate {
  private date: Date;

  constructor(date: Date | string) {
    if (typeof date === 'string' && Number.isNaN(Date.parse(date))) throw new EventError(`Invalid date '${date}'`);
    this.date = (date instanceof Date)? date : new Date(date);
  }

  get value(): Date {
    return this.date;
  }
}

export type EventDTO = {
  date: EventDate,
  title: string,
  description: string,
  createAt: Date | null,
  canceledAt?: Date | null,
};
export class Event {
  private _id: string;
  private props: EventDTO;

  constructor(
    props: Replace<EventDTO, { createAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createAt: props.createAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get date() {
    return this.props.date;
  }

  set date(value: EventDate) {
    this.props.date = value;
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get description() {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get createAt() {
    return this.props.createAt;
  }

  set createAt(value: Date | null | undefined) {
    this.props.createAt = value;
  }

  get canceledAt() {
    return this.props.canceledAt;
  }
  
  set canceledAt(value: Date | null | undefined) {
    this.props.canceledAt = value;
  }
}
