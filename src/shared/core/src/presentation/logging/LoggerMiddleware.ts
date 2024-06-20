import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../domain/ports/LoggerService';
import * as httpLogger from './HttpLogger';
const onHeaders = require('on-headers');
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('LOGGER_SERVICE') private logger: Logger) {}
  async use(req: Request, res: Response, next: NextFunction) {
    httpLogger.logRequest(req, this.logger);
    await next();
    httpLogger.logResponse(req, res, this.logger);
  }
}
