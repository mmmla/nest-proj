import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constants';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './login-guard.guard';

@Module({
  imports:[TypeOrmModule.forFeature([Login]),],
  controllers: [LoginController,],
  providers: [LoginService,{
    provide: APP_GUARD,//应用于全局
    useClass: LoginGuard,
  },],
})
export class LoginModule {}
