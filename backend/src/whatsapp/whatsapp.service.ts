import { Injectable } from '@nestjs/common';

@Injectable()
export class WhatsappService {
  async sendMessage(phone: string, message: string) {
    console.log(`Sending to ${phone}: ${message}`);
  }
}
