import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateLoginDto {

    @IsNotEmpty()
    @IsString()
    // @IsNumber()
    account: string

    @IsNotEmpty()
    @IsString()
    password:string

    @IsNotEmpty()
    @IsString()
    checkCode:string


}
