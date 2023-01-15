import { CreateEventBody } from './../dtos/create-event-body';
import { Controller, Get } from '@nestjs/common';
import { Res, Body, Param, Post, Put, Delete } from '@nestjs/common/decorators';
import { Event, EventDate } from 'src/app/entities/event';
import { EventRepository } from 'src/app/repositories/event.repository';
import { Response } from 'express';
import { EventViewModel } from '../view-models/event-view-model';

@Controller('event')
export class EventController {
  constructor(
    private eventRepository: EventRepository
  ) {}

  @Get()
  async list() {
    const events = await this.eventRepository.findAll();
    return {
      payload: events.map(EventViewModel.toHTTP),
    };
  }

  @Get(':id')
  async findById(@Param('id') _id: string, @Res() response: Response) {
    try {
      const event = await this.eventRepository.findById(_id);
      return response.status(200).json(EventViewModel.toHTTP(event));
    } catch(err) {
      if (err instanceof Error) 
        response.status(400).json({
          message: err.message,
        });
      else
        response.status(500).json({
          message: 'An unexpected error occurred',
        });
    }
  }

  @Get(':year/:month/:day')
  async findByDate(@Res() response: Response, @Param('year') year: number, @Param('month') month: number, @Param('day') day: number) {
    try {
      if (month <= 0 || month > 12) throw new Error('Invalid month info. Month must be between 1 and 12');
      if (day < 1 || day > 31) throw new Error('Invalid day info. Day must be between 1 and 31');
      const events = await this.eventRepository.findByDate(new Date(year, month - 1, day));
      return response.status(200).json(events.map(EventViewModel.toHTTP));
    } catch(err) {
      if (err instanceof Error) 
        response.status(400).json({
          message: err.message,
        });
      else
        response.status(500).json({
          message: 'An unexpected error occurred',
        });
    }
  }

  @Get(':year/:month')
  async findByPeriod(@Param('year') year: number, @Param('month') month: number) {
    if (month <= 0 || month > 12) throw new Error('month must be between 1 and 12');
    // compatibilidade na indexacao de numero para mes 
    month = month - 1;
    const events = await this.eventRepository.findByPeriod(year, month);
    return {
      payload: events.map(EventViewModel.toHTTP),
    };
  }

  @Post()
  async create(@Res() response: Response, @Body() body: CreateEventBody) { 
    try {
      const { date, title, description } = body;
      const event  = new Event({
        date: new EventDate(date),
        title,
        description,
      });
      const eventCreate = await this.eventRepository.create(event);
      response.status(201).json(EventViewModel.toHTTP(eventCreate));
    } catch(err) {
      if (err instanceof Error) 
        response.status(400).json({
          message: err.message,
        });
      else
        response.status(500).json({
          message: 'An unexpected error occurred',
        });
    }
  }

  @Put(':id')
  async update(@Param('id') _id: string, @Res() response: Response, @Body() body: CreateEventBody) {
    try {
      const { date, title, description } = body;
      const event  = new Event({
        date: new EventDate(date),
        title,
        description,
      }, _id);
      const eventUpdate = await this.eventRepository.update(event);
      response.status(201).json(EventViewModel.toHTTP(eventUpdate));
    } catch(err) {
      if (err instanceof Error) 
        response.status(400).json({
          message: err.message,
        });
      else
        response.status(500).json({
          message: 'An unexpected error occurred',
        });
    }
  }

  @Delete(':id')
  async delete(@Param('id') _id: string, @Res() response: Response) {
    try {
      await this.eventRepository.delete(_id);
      return response.status(200).end();
    } catch(err) {
      if (err instanceof Error) 
        response.status(400).json({
          message: err.message,
        });
      else
        response.status(500).json({
          message: 'An unexpected error occurred',
        });
    }
  }
}
