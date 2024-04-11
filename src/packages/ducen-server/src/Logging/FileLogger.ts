import { Logger } from '@ducen/core';
import * as winston from 'winston';
import { format } from './Format';

export interface FileLoggerOptions {
  serviceName: string;
  environment: string;
}
export class FileLogger implements Logger {
  private winstonLogger: winston.Logger;
  constructor({ environment, serviceName }: FileLoggerOptions) {
    const filename = `logs/${serviceName}-${environment}-${new Date().toISOString()}.log`;
    this.winstonLogger = winston.createLogger({
      transports: [new winston.transports.Console({ format }), new winston.transports.File({ filename, format })],
    });
  }
  log(message: any): void {
    this.winstonLogger.log('info', message);
  }
  error(message: any, stack?: string): void {
    this.winstonLogger.error(message);
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
    this.winstonLogger.http(message);
  }
  response(message: any): void {
    this.winstonLogger.http(message);
  }
}
