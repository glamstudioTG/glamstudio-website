import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class registerUserDto {

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}