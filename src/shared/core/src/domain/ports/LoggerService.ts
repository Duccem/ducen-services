export interface Logger {
  log(message: any): void;
  error(message: any, stack?: any): void;
  warn(message: any): void;
  debug(message: any): void;
  verbose(message: any): void;
  request(message: any): void;
  response(message: any): void;
}

export const RESET = '\x1b[0m';

export enum Levels {
  info = '\x1b[32m',
  error = '\x1b[31m',
  warn = '\x1b[33m',
  debug = '\x1b[34m',
  verbose = '\x1b[36m',
  http = '\x1b[35m',
}

export enum FormatDates {
  ISO = 'YYYY-MM-dd HH:mm:ss.SSS',
  LARGE = 'cccc, MMMM Do yyyy, h:mm:ss.SSS a',
  UTC = 'dd, cccc MMM yyyy HH:mm:ss.SSS',
  CLF = 'dd/MMM/yyyy:HH:mm:ss.SSS',
}

export enum LogTypes {
  LOG = '[LOG]',
  ERROR = '[ERROR]',
  REQUEST = '[REQUEST]',
  RESPONSE = '[RESPONSE]',
  WARNING = '[WARNING]',
  INFO = '[INFO]',
}
