import * as winston from 'winston';
import LokiTransport from 'winston-loki';
import { FormatDates, Levels, Logger, RESET } from '../../domain/ports/LoggerService';
/**
 * @name WinstonLogFormat
 * @description This const is the format of the log in this project
 */
export const WinstonLogFormat = winston.format.combine(
  winston.format.timestamp({ format: FormatDates.ISO }),
  winston.format.printf(
    ({ level, message, timestamp }) => `${Levels[level]}[${level}] ${timestamp}${RESET} ${message}`,
  ),
);
/**
 * @name ConsoleLoggerOptions
 * @description This interface is the options for the console logger
 * @property serviceName - The name of the service
 * @property environment - The environment of the service
 */
export interface ConsoleLoggerOptions {
  serviceName: string;
  environment: string;
}

/**
 * @name ConsoleWinstonLogger
 * @description This class is the console logger
 */
export class ConsoleWinstonLogger implements Logger {
  protected winstonLogger: winston.Logger;
  constructor(private options: ConsoleLoggerOptions) {
    this.winstonLogger = winston.createLogger({
      transports: [new winston.transports.Console()],
      format: WinstonLogFormat,
    });
  }

  enableFileLogger(): void {
    const filename = `logs/${this.options.serviceName}-${this.options.environment}-${new Date().toISOString()}.log`;
    this.winstonLogger.add(new winston.transports.File({ filename, format: WinstonLogFormat }));
  }

  enableLokiLogger(host: string): void {
    this.winstonLogger.add(
      new LokiTransport({
        host: host,
        labels: { app: this.options.serviceName, env: this.options.environment },
        format: WinstonLogFormat,
      }),
    );
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
