import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UpdateServiceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  image?: string;
}
