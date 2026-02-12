import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateProfileWorkerDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  avatar?: string;
}
