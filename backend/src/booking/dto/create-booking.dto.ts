import { IsString, IsNotEmpty, IsOptional, IsDateString } from "class-validator";

export class CreateBookingDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    serviceId: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsString()
    @IsOptional()
    comment?: string;
}