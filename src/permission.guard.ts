import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject()
  private reflector: Reflector;

  @Inject(JwtService)
  private JwtService: JwtService;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(11111111, request.user);
    if (!request.user) {
      return true;
    }
    const permissions = request.user.permissions;
    const requirePermission = this.reflector.getAllAndOverride<string[]>(
      'require-permission',
      [context.getHandler(), context.getClass()],
    );
    if (!requirePermission) {
      return true;
    }
    for (let i = 0; i < requirePermission.length; i++) {
      const curpermission = requirePermission[i];
      const found = permissions.find((item) => item.code === curpermission);
      if (!found) {
        throw new UnauthorizedException('没有该接口访问权限');
      }
      return true;
    }
  }
}
