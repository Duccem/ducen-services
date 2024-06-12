import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Logger } from '../../domain/core/Logger';
import { NetTracer } from './NetTracer';
const onHeaders = require('on-headers');
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject('LOGGER_SERVICE') private logger: Logger) {}
  async use(req: Request, res: Response, next: NextFunction) {
    NetTracer.Request(req, this.logger);
    startRecording.call(req);
    onHeaders(res, startRecording);
    await next();
    NetTracer.Response(req, res, this.logger);
  }
}

function startRecording(this: any) {
  this._startTime = process.hrtime();
}
