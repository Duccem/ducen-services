import * as winston from 'winston';
import { FormatDates, Levels, Decorator } from '../../domain/Logger';
export const format = winston.format.combine(
  winston.format.timestamp({ format: FormatDates.ISO }),
  winston.format.printf(
    ({ level, message, timestamp }) => `${Levels[level]}[${level}] ${timestamp}${Decorator.RESET} ${message}`,
  ),
);
