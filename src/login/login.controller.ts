import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Session, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { SignInDto } from './dto/sign-in.dto';
import * as svgCapTcha from 'svg-captcha'
import { Public } from 'src/common/constants';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Public()
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const Captcha = svgCapTcha.create({
      size: 4,
      fontSize: 50,
      width: 100,
      height: 34,
      background: '#cc9966'
    })

    session.code = Captcha.text;
    console.log(session);

    res.type('image/svg+xml')
    res.send(Captcha.data)
  }


  //登录
  @Public()
  @Post()
  login(@Body() user: SignInDto, @Session() session) {
    console.log(session);
    
    return this.loginService.login(user, session.code)
  }

  //注册新用户
  @Public()
  @Post('/addAdminUser')
  signUp(@Body() CreateLoginDto: CreateLoginDto,@Session() session) {
    return this.loginService.create(CreateLoginDto,session.code)
  }

  //验证token是否合法
  @Public()
  @Get('/verifyToken')
  checkToken(@Req() req){
    return this.loginService.verifyToken(req.query.data)
  }

  @Get()
  findAll() {
    return this.loginService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loginService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoginDto: SignInDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
