import LokiTransport from 'winston-loki';
import { ConsoleLogger, ConsoleLoggerOptions } from './ConsoleLogger';
import { format } from './Format';
export interface LokiLoggerOptions {
  host: string;
}
export class LokiLogger extends ConsoleLogger {
  constructor({ serviceName, environment, host }: ConsoleLoggerOptions & LokiLoggerOptions) {
    super({ serviceName, environment });
    this.winstonLogger.add(
      new LokiTransport({
        host: host,
        labels: { app: serviceName, env: environment },
        format,
      }),
    );
  }
}
