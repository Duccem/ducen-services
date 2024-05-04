import { addDays, intervalToDuration, isValid, isWithinInterval, subDays } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { FormatError } from '../../Errors/FormatError';
import { ValueObject } from '../../ValueObject';

export class DateValueObject extends ValueObject<Date> {
  private readonly timezone?: string;
  constructor(value: string | number | Date, timezone?: string) {
    super(typeof value === 'string' && !value.includes('-') ? new Date(Number(value)) : new Date(value));
    this.timezone = timezone;
  }

  public validation(value: Date): void {
    if (!isValid(new Date(value))) throw new FormatError(`${value} is not a valid date`);
  }

  public toUTC(): Date {
    return zonedTimeToUtc(this.value, this.timezone || process.env['GLOBAL_TIMEZONE'] || '');
  }

  public toTimeZone(): Date {
    return utcToZonedTime(this.value, this.timezone || process.env['GLOBAL_TIMEZONE'] || '');
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
