import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InvokeRecodeInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecodeInterceptor.name);
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const useAgent = request.headers['user-agent'];
    const { ip, method, path } = request;
    this.logger.debug(
      `${ip} ${method} ${path} ${useAgent}:${context.getClass().name}.${context.getHandler().name} invoke...`,
    );
    this.logger.debug(
      `user: ${request.user?.userId},${request.user?.username}`,
    );
    const now = Date.now();

    return next.handle().pipe(
      tap((res) => {
        this.logger.debug(
          `${method} ${path} ${ip} ${useAgent} : ${response.statusCode}: ${Date.now() - now}ms`,
        );
        this.logger.debug(`Response: ${JSON.stringify(res)}`);
      }),
    );
  }
}
