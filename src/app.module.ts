import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [LoginModule, TypeOrmModule.forRoot({
    type: 'mysql',
    username: 'root',
    password: '123456',
    host: 'localhost',
    port: 3306,
    database: 'nestProjdb',
    //自动创建表、自动同步更新表结构,数据库存在表时会产生冲突，生产环境慎用，可能会意外更改表结构
    // synchronize: true,
    retryDelay: 500,
    retryAttempts: 10,
    autoLoadEntities: true,
  }), UserModule],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule { }
