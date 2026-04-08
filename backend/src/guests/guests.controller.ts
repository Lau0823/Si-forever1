import { Controller, Post, Get, Patch, Param, Body } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './create-guests.dto';

@Controller('guests')
export class GuestsController {
  constructor(private guestsService: GuestsService) {}

  // Crear invitados
  @Post('event/:eventId')
  createGuests(
    @Param('eventId') eventId: string,
    @Body() guests: CreateGuestDto[],
  ) {
    return this.guestsService.createMany(eventId, guests);
  }
  // obtener por código
  @Get(':codigo')
  getByCode(@Param('codigo') codigo: string) {
    return this.guestsService.findByCode(codigo);
  }
  // confirmar asistencia
  @Patch('confirm/:codigo')
  confirm(@Param('codigo') codigo: string, @Body() body) {
    return this.guestsService.confirm(codigo, body);
  }
  // Enviar invitaciones (opcional)
  @Post('send/:eventId')
  send(@Param('eventId') eventId: string) {
    return this.guestsService.sendInvitations(eventId);
  }
  // obtener por id
  @Get('event/:eventId')
  getGuestsByEvent(@Param('eventId') eventId: string) {
    return this.guestsService.getByEvent(eventId);
  }
  // obtener links
  @Get('links/:eventId')
  getLinks(@Param('eventId') eventId: string) {
    return this.guestsService.getLinks(eventId);
  }
}
