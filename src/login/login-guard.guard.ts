import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants, IS_PUBLIC_key } from 'src/common/constants';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector
  ) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride(IS_PUBLIC_key, [context.getHandler(),context.getClass(),])
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);
    // console.log(token);

    if (!token) {
      throw new UnauthorizedException()
    }

    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
    } catch (e) {
      throw new UnauthorizedException()
    }
    return true;
  }


  getTokenFromHeader(request: Request) {
    const authHeader = (request.headers as { authorization?: string }).authorization
    if (!authHeader) {
      return false
    }
    const [type, token] = authHeader.split(' ')
    return type === 'Bearer' ? token : undefined
  }
}
