import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({},{message:"email is not valid"})
    @IsNotEmpty({message:"email is required"})
    email!: string;
    @IsNotEmpty({message:"password is required"})
    pass!: string;
}