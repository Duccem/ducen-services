import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { DomainError } from '@ducen/core';
import { Response } from 'express';

@Catch(Error)
export class RESTCatchErrors implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(exception.getCode()).json({
      message: exception.getMessage(),
      code: exception.getCode(),
      timestamp: exception.getTimestamp(),
    });
  }
}
