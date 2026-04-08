import { Controller, Post, Get, Body } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './create-events.dto';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post()
  create(@Body() body: CreateEventDto) {
    return this.eventsService.create(body);
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }
}
