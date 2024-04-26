import * as winston from 'winston';
import { Logger } from '../../domain/Logger';
import { format } from './Format';
export interface ConsoleLoggerOptions {
  serviceName: string;
  environment: string;
}
export class ConsoleLogger implements Logger {
  protected winstonLogger: winston.Logger;
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
