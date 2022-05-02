import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { stat } from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | String
      | { error: string; statusCode: number; message: string | string[] };

    if (typeof error === 'string') { //인위적 에러
      response
      .status(status)
      .json({
        success: false,
        timestamp: new Date().toISOString(),
        path: request.url,
        error
    });
  } else { //실제 에러
    response
      .status(status)
      .json({
        success: false,
        timestamp: new Date().toISOString(),
        ...error
      });
    }
  }
}