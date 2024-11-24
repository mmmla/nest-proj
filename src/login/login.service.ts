import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { SignInDto } from './dto/sign-in.dto';
import { Login } from './entities/login.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BcryptService } from 'src/common/bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants, Public } from 'src/common/constants';

@Injectable()
export class LoginService {
  constructor(@InjectRepository(Login) private readonly loginUser: Repository<Login>,
    private readonly jwtService: JwtService
  ) { }

  //创建管理员账户
  async create(createLoginDto: CreateLoginDto, code: String) {
    const { account, password, checkCode } = createLoginDto
    if (code.toLowerCase() != checkCode.toLowerCase()) {
      return {
        status: 'error',
        message: '验证码错误'
      }
    }
    const res = await this.loginUser.findOne({ where: { account: account } })
    if (res) {
      return {
        status: 'error',
        message: '账号已存在'
      }
    }

    createLoginDto.password = await BcryptService.hash(password).catch(e => {
      // 在这里处理密码哈希失败的情况  
      throw new Error('Password hashing failed: ' + e.message);
    })
    try {
      await this.loginUser.save(createLoginDto)
      return {
        status: 'success',
        message: '保存成功'
      }
    } catch (e) {
      // 在这里处理保存用户失败的情况  
      throw new Error('Failed to save user: ' + e.message);
    }
  }

  //登录账号
  async login(user: any, code: String) {
    const { account, password, checkCode } = user
    
    try {
      if (code.toLowerCase() != checkCode.toLowerCase()) {
        return {
          status: 'error',
          message: '验证码错误'
        }
      }

      const user = await this.loginUser.findOne({ where: { account } })
      if (user && await BcryptService.compare(password, user.password)) {
        const payload = { sub: account, password }
        return {
          access_token: await this.jwtService.signAsync(payload)
        }
      } else {
        // throw new UnauthorizedException()
        return {
          status: 'error',
          message: '账号或密码错误'
        }
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, { secret: jwtConstants.secret })
    } catch (error) {
      return false
    }
    return true
  }

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: SignInDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
