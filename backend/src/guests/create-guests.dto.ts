import { IsString } from 'class-validator';

export class CreateGuestDto {
  @IsString()
  nombre: string;

  @IsString()
  telefono: string;
}
