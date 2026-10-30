import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
   @IsEmail({},{message:"email is not valid"})
   @IsNotEmpty({message:"email is required"})
   email!:string
@IsNotEmpty({message:"password is required"})
password!:string

@IsNotEmpty({message:"fullName is required"})
fullName!:string

@IsNotEmpty({message:"phoneNumber is required"})
phoneNumber!:string

@IsNotEmpty({message:"address is required"})
address!:string


}
