import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class BookingClientDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string | null;
}

class BookingWorkerDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;
}

class BookingServiceItemDto {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @IsNumber()
  duration!: number;

  @IsNumber()
  price!: number;
}

export class BookingResponseDto {
  @IsUUID()
  id!: string;

  @IsString()
  status!: string;

  @IsString()
  date!: string;

  @IsString()
  startTime!: string;

  @IsString()
  endTime!: string;

  @IsNumber()
  totalDuration!: number;

  @IsNumber()
  totalPrice!: number;

  @ValidateNested()
  @Type(() => BookingClientDto)
  client!: BookingClientDto;

  @ValidateNested()
  @Type(() => BookingWorkerDto)
  worker!: BookingWorkerDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookingServiceItemDto)
  services!: BookingServiceItemDto[];
}
