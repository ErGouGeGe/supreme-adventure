/*
 * @Author: wangshun@itbox.cn wangshun@itbox.cn
 * @Date: 2024-12-22 19:08:29
 * @LastEditors: wangshun@itbox.cn wangshun@itbox.cn
 * @LastEditTime: 2025-01-03 02:17:34
 */
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Permission } from './user/entities/permission.entity';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UnLoginException } from './unlogin.filter';
interface JwtUserData {
  username: string;
  userId: number;
  roles: string[];
  email: string;
  permissions: Permission[];
}

declare module 'express' {
  interface Request {
    user: JwtUserData;
  }
}
@Injectable()
export class LoginGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private JwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const requireLogin = this.reflector.getAllAndOverride('require-login', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireLogin) {
      return true;
    }
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new UnLoginException();
    }
    try {
      const token = authorization.split(' ')[1];
      const data = this.JwtService.verify<JwtUserData>(token);
      console.log('222222', data);
      request.user = {
        userId: data.userId,
        username: data.username,
        roles: data.roles,
        email: data.email,
        permissions: data.permissions,
      };
      return true;
    } catch (e) {
      console.log(e);
      throw new UnLoginException('token失效 请重新登陆');
    }
  }
}
