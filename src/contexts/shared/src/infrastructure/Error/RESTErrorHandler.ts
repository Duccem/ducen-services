import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { DomainError } from '../../domain/core/DomainError';

@Catch(Error)
export class RESTCatchErrors implements ExceptionFilter {
  catch(exception: DomainError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.json({
      message: exception.getMessage(),
      timestamp: exception.getTimestamp(),
    });
  }
}
