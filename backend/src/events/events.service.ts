import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './create-events.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateEventDto) {
    console.log('DATA:', data);
    const baseSlug = data.nombre.toLowerCase().replace(/\s/g, '-');

    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    return this.prisma.event.create({
      data: {
        nombre: data.nombre,
        fecha: new Date(data.fecha),
        slug: uniqueSlug,
      },
    });
  }

  findAll() {
    return this.prisma.event.findMany();
  }
}
