import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WhatsappService } from '../whatsapp/whatsapp.service';
import { CreateGuestDto } from './create-guests.dto';

@Injectable()
export class GuestsService {
  constructor(
    private prisma: PrismaService,
    private whatsapp: WhatsappService,
  ) {}

  // ✅ Crear múltiples invitados
  async createMany(eventId: string, guests: CreateGuestDto[]) {
    return this.prisma.guest.createMany({
      data: guests.map((g) => ({
        nombre: g.nombre,
        telefono: g.telefono,
        eventId,
      })),
    });
  }

  // ✅ Buscar invitado por código (para la tarjeta)
  async findByCode(codigo: string) {
    const guest = await this.prisma.guest.findUnique({
      where: { codigo },
      include: { event: true },
    });

    if (!guest) {
      throw new NotFoundException('Invitado no encontrado');
    }

    return guest;
  }

  // 🔥 CONFIRMAR ASISTENCIA
  async confirm(codigo: string, data: any) {
    const guest = await this.prisma.guest.findUnique({
      where: { codigo },
    });

    // ❌ No existe
    if (!guest) {
      throw new NotFoundException('Invitado no encontrado');
    }

    // 🚨 Ya respondió (evita doble confirmación)
    if (guest.estado !== 'pendiente') {
      throw new BadRequestException(
        `Este invitado ya respondió: ${guest.estado}`,
      );
    }

    // ❌ Estado inválido
    if (!['confirmado', 'rechazado'].includes(data.estado)) {
      throw new BadRequestException('Estado inválido');
    }

    // ✅ Actualización
    return this.prisma.guest.update({
      where: { codigo },
      data: {
        estado: data.estado,
        acompanantes: data.acompanantes ?? 0,
      },
    });
  }

  async getByEvent(eventId: string) {
    return this.prisma.guest.findMany({
      where: { eventId },
    });
  }

  async getLinks(eventId: string) {
    const guests = await this.prisma.guest.findMany({
      where: { eventId },
      include: { event: true },
    });

    return guests.map((g) => ({
      nombre: g.nombre,
      telefono: g.telefono,
      link: `${process.env.FRONTEND_URL}/${g.event.slug}/${g.codigo}`,
    }));
  }

  // 📲 Envío de invitaciones (opcional si usas WhatsApp API)
  async sendInvitations(eventId: string) {
    const guests = await this.prisma.guest.findMany({
      where: { eventId },
      include: { event: true },
    });

    for (const guest of guests) {
      const link = `${process.env.FRONTEND_URL}/${guest.event.slug}/${guest.codigo}`;

      const message = `Hola ${guest.nombre} 👋
Te compartimos tu invitación:
${link}`;

      await this.whatsapp.sendMessage(guest.telefono, message);
    }

    return {
      message: 'Invitaciones enviadas correctamente',
      total: guests.length,
    };
  }
}
