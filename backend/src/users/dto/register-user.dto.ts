import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';

export class registerUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
