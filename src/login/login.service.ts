import { Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { error } from 'console';

@Injectable()
export class LoginService {
  login(user:any,code:String) {
    const { account, password,checkCode }=user

    try{
      if(code.toLowerCase()!=checkCode.toLowerCase()){
        return {
          status:'error',
          message:'验证码错误'
        }
      }
  
      if (account == 123 && password == 123) {
        return {
          status:'success',
          message:'登录成功'
        }
      } else {
        return {
          status:'error',
          message:'账号或密码错误'
        }
      }
    }catch{
      error=>console.error(error)
    }
  }


  create(createLoginDto: CreateLoginDto) {
    return 'This action adds a new login';
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
