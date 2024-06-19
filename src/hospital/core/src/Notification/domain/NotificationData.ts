import { ValueObject } from '@ducen/shared';

export class NotificationData extends ValueObject<{ [key: string]: any }> {
  protected validation(value: { [key: string]: any }): void {
    if (!value) {
      throw new Error('Data is required');
    }
  }
  public toString(): string {
    return JSON.stringify(this.value);
  }
}
