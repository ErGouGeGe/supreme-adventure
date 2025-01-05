import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    response.statusCode = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };
    console.log(res);
    response
      .json({
        code: exception.getStatus(),
        message: exception.message,
        data: exception.message,
      })
      .end();
  }
}
