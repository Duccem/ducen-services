import { Request, Response } from 'express';
import { Logger } from '../../domain/ports/LoggerService';
enum Color {
  NULL = '\x1b[30m',
  ERROR = '\x1b[31m',
  SUCCESS = '\x1b[32m',
  WARNING = '\x1b[33m',
  INFO = '\x1b[34m',
  SYSTEM = '\x1b[35m',
  IMPORTANT = '\x1b[36m',
  MESSAGE = '\x1b[37m',
}
const RESET = '\x1b[0m';

const methods = new Map([
  ['GET', Color.SUCCESS],
  ['POST', Color.WARNING],
  ['PUT', Color.IMPORTANT],
  ['DELETE', Color.ERROR],
]);

const codes = new Map([
  [200, Color.SUCCESS],
  [201, Color.SUCCESS],
  [204, Color.SUCCESS],
  [301, Color.INFO],
  [302, Color.INFO],
  [304, Color.INFO],
  [400, Color.WARNING],
  [401, Color.WARNING],
  [403, Color.WARNING],
  [404, Color.WARNING],
  [422, Color.WARNING],
  [500, Color.ERROR],
  [502, Color.ERROR],
  [503, Color.ERROR],
  [504, Color.ERROR],
]);
const color = (color: Color, str: any): string => color + str + RESET;
const formatMethod = ({ method }: Request): string => color(methods.get(method), method);
const formatVersion = ({ httpVersion }: Request): string => httpVersion;
const formatUrl = ({ originalUrl }: Request): string => color(Color.INFO, originalUrl);
const formatIp = ({ ip }: Request): string => color(Color.SUCCESS, ip);
const formatStatus = (_: Request, { statusCode: code }: Response): string => color(codes.get(code), code);

const tokens = new Map<string, Function>([
  [':method', formatMethod],
  [':version', formatVersion],
  [':url', formatUrl],
  [':ip', formatIp],
  [':status', formatStatus],
]);

export const formatLog = (message: string, request: Request, response: Response): string => {
  let log = message;
  tokens.forEach((format, token) => {
    if (!log.includes(token)) return;
    log = log.replace(token, format(request, response));
  });
  return log;
};

export const logRequest = (request: Request, logger: Logger): void => {
  const log = formatLog('Requested :method :version :url from :ip', request, null);
  logger.request(log);
};
export const logResponse = (request: Request, response: Response, logger: Logger): void => {
  const log = formatLog('Responded to :url requested by :ip with status :status', request, response);
  logger.request(log);
};
