import {
  IsArray,
  IsEmail,
  IsOptional,
  IsString,
  IsUUID,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  workerId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  serviceIds: string[];

  @IsString()
  date: string; // YYYY-MM-DD

  @IsString()
  startTime: string; // HH:mm

  @IsOptional()
  @IsString()
  comment?: string;

  // Guest (solo si NO hay usuario autenticado)
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;
}
