import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class registerDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsPhoneNumber()
  phone: string;
}
