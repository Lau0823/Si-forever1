import { IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  nombre: string;

  @IsDateString()
  fecha: string;
}
