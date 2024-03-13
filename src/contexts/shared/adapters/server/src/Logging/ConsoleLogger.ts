import { Logger } from '@shared/core';
import * as winston from 'winston';
import { format } from './Format';
export interface ConsoleLoggerOptions {}
export class ConsoleLogger implements Logger {
  private winstonLogger: winston.Logger;
  constructor({}: ConsoleLoggerOptions) {
    this.winstonLogger = winston.createLogger({
      transports: [new winston.transports.Console()],
      format,
    });
  }
  log(message: any): void {
    this.winstonLogger.log('info', message);
  }
  error(_message: any, stack?: any): void {
    this.winstonLogger.error(stack);
  }
  warn(message: any): void {
    this.winstonLogger.warn(message);
  }
  debug(message: any): void {
    this.winstonLogger.debug(message);
  }
  verbose(message: any): void {
    this.winstonLogger.verbose(message);
  }
  request(message: any): void {
    this.winstonLogger.info(message);
  }
  response(message: any): void {
    this.winstonLogger.http(message);
  }
}
