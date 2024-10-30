import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Session, Res } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import * as svgCapTcha from 'svg-captcha'

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }


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

  @Post()
  login( @Body() user:CreateLoginDto, @Session() session) {

    // console.log(user);
    return this.loginService.login(user,session.code)
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
  update(@Param('id') id: string, @Body() updateLoginDto: UpdateLoginDto) {
    return this.loginService.update(+id, updateLoginDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loginService.remove(+id);
  }
}
