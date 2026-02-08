import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  duration!: number;

  @IsNumber()
  @IsNotEmpty()
  price!: number;

  @IsString()
  image!: string;
}
