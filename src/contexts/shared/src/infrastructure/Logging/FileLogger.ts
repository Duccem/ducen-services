import * as winston from 'winston';
import { ConsoleLogger, ConsoleLoggerOptions } from './ConsoleLogger';
import { format } from './Format';
export class FileLogger extends ConsoleLogger {
  constructor({ serviceName, environment }: ConsoleLoggerOptions) {
    super({ serviceName, environment });
    const filename = `logs/${serviceName}-${environment}-${new Date().toISOString()}.log`;
    this.winstonLogger.add(new winston.transports.File({ filename, format }));
  }
}
