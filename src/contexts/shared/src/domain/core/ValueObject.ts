import { addDays, intervalToDuration, isValid, isWithinInterval, subDays } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { FormatError } from '../common/errors/FormatError';
export abstract class ValueObject<T> {
  public value: T;
  constructor(value: T) {
    this.validation(value);
    this.value = value;
  }
  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
  protected abstract validation(value: T): void;
  public abstract toString(): string;
}

export class BooleanValueObject extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validation(value: boolean): void {
    if (typeof value !== 'boolean') throw new Error(`${value} is not a valid boolean`);
  }
  public getValue(): boolean {
    return this.value;
  }
  public toString(): string {
    return this.value.toString();
  }
}

export class DateValueObject extends ValueObject<Date> {
  constructor(value: string | number | Date) {
    super(typeof value === 'string' && !value.includes('-') ? new Date(Number(value)) : new Date(value));
  }

  public validation(value: Date): void {
    if (!isValid(new Date(value))) throw new FormatError(`${value} is not a valid date`);
  }

  public toUTC(tz: string): Date {
    return zonedTimeToUtc(this.value, tz || process.env['GLOBAL_TIMEZONE'] || '');
  }

  public toTimeZone(tz: string): Date {
    return utcToZonedTime(this.value, tz || process.env['GLOBAL_TIMEZONE'] || '');
  }

  public getValue(): Date {
    return this.value;
  }

  public addDays(days: number): DateValueObject {
    return new DateValueObject(addDays(this.value, days));
  }

  public subDays(days: number): DateValueObject {
    return new DateValueObject(subDays(this.value, days));
  }

  public static today(): DateValueObject {
    return new DateValueObject(new Date());
  }
  public toString(): string {
    return this.value.toString();
  }

  public static calculateIntervalDuration(startDate: DateValueObject, endDate: DateValueObject): Duration {
    return intervalToDuration({
      end: endDate.getValue(),
      start: startDate.getValue(),
    });
  }

  public static isInBetween(startDate: DateValueObject, endDate: DateValueObject): boolean {
    return isWithinInterval(DateValueObject.today().getValue(), {
      end: endDate.getValue(),
      start: startDate.getValue(),
    });
  }
}

export class NumberValueObject extends ValueObject<number> {
  public validation(value: number): void {
    if (value === null || value === undefined) {
      throw new FormatError('Value number must be defined');
    }
  }

  public getValue(): number {
    return this.value;
  }

  public toString(): string {
    return this.value.toString();
  }

  public static zero(): NumberValueObject {
    return new NumberValueObject(0);
  }
}

export class StringValueObject extends ValueObject<string> {
  protected validation(value: string): void {
    if (value === null || value === undefined) {
      throw new FormatError('Value string must be defined');
    }
  }

  public toString(): string {
    return this.value;
  }

  public static Empty(): StringValueObject {
    return new StringValueObject('');
  }
}
