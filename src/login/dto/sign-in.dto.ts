import { PartialType } from '@nestjs/mapped-types';
import { CreateLoginDto } from './create-login.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto extends PartialType(CreateLoginDto) {
    @IsNotEmpty()
    @IsString()
    checkCode:string

    @IsString()
    @IsNotEmpty()
    account:string

    @IsString()
    @IsNotEmpty()
    password:string
}
