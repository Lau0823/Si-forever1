import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { EventsModule } from './events/events.module';
import { GuestsModule } from './guests/guests.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    EventsModule,
    GuestsModule,
    WhatsappModule,
  ],
})
export class AppModule {}
