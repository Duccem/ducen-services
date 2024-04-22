import { Logger } from '@ducen/core';
export interface ConsoleLoggerOptions {}
export class ConsoleLogger implements Logger {
  constructor({}: ConsoleLoggerOptions) {}
  log(message: any): void {
    throw new Error('Method not implemented.');
  }
  error(message: any, stack?: any): void {
    throw new Error('Method not implemented.');
  }
  warn(message: any): void {
    throw new Error('Method not implemented.');
  }
  debug(message: any): void {
    throw new Error('Method not implemented.');
  }
  verbose(message: any): void {
    throw new Error('Method not implemented.');
  }
  request(message: any): void {
    throw new Error('Method not implemented.');
  }
  response(message: any): void {
    throw new Error('Method not implemented.');
  }
}
