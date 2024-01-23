import { IsNotEmpty, IsString } from "class-validator";

export class postDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    location: { latitude: number; longitude: number; }
}