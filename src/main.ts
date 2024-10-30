import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { HttpFilter } from './common/filter';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  //用于接收前端的cookie凭证
  const corsOptions = {
    origin: ['http://localhost:3000','http://localhost:3001'], // 确保这个值与请求的源匹配  
    credentials: true // 允许发送凭据  
  };
  //启用全局跨域
  app.enableCors(corsOptions);


  //后端使用session的时候，会往前端植入一个cookie凭证，前端请求的时候携带cookie，后端就能拿到对应session里面的值
  app.use(session({ secret: "xiaolan", name: "xl.session", rolling: true, cookie: { maxAge: null } }))

  app.useGlobalFilters(new HttpFilter())

  app.useGlobalInterceptors(new ResponseInterceptor())

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001);
}
bootstrap();
