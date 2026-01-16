import {
  IsString,
  IsOptional,
  IsDateString,
  IsEmail,
  IsPhoneNumber,
  IsArray,
} from 'class-validator';

export class CreateBookingDto {
  @IsOptional()
  workerId: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsArray()
  serviceIds: string[];

  @IsDateString()
  date: string;

  @IsString()
  startTime: string;

  @IsOptional()
  @IsString()
  comment?: string;
}
