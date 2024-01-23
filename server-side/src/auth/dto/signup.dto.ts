import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class signUpDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}