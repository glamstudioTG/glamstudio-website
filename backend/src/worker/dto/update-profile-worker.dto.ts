import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileWorkerDto {
  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profile?: string;
}
