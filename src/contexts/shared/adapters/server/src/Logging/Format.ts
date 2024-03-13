import { Decorator, FormatDates, Levels } from '@shared/core';
import * as winston from 'winston';
export const format = winston.format.combine(
  winston.format.timestamp({ format: FormatDates.ISO }),
  winston.format.printf(
    ({ level, message, timestamp }) => `${Levels[level]}[${level}] ${timestamp}${Decorator.RESET} ${message}`,
  ),
);
