import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;
}
