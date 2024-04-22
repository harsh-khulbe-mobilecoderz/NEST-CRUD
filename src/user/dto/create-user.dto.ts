import { IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length} from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsNumber()
    @IsPhoneNumber()
    phoneNumber:string;

    @IsNotEmpty()
    @IsString()
    otp:string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string;
}

export class OtpObjectDto {
    @IsNotEmpty()
    @IsString()
    otp:string;
}
