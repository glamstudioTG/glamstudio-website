import { IsString, IsPhoneNumber } from 'class-validator';

export class updateUserDto {
  @IsString()
  name?: string;

  @IsString()
  @IsPhoneNumber()
  phone?: string;
}
