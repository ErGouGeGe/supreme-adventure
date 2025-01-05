/*
 * @Author: wangshun@itbox.cn wangshun@itbox.cn
 * @Date: 2024-12-22 20:41:51
 * @LastEditors: wangshun@itbox.cn wangshun@itbox.cn
 * @LastEditTime: 2025-01-03 02:18:30
 */
import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);

export const RequirePermission = (...permission: string[]) =>
  SetMetadata('require-permission', permission);

export const UserInfo = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(333333, request.user);
    if (!request.user) {
      return null;
    }
    return data ? request.user[data] : request.user;
  },
);
