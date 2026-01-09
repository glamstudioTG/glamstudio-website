import { IsPhoneNumber, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  name: string;
  
  @IsPhoneNumber()
  phone: string;
}
