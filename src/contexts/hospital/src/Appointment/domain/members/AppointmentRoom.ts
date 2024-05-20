import { Primitives, StringValueObject } from '@ducen-services/shared';

export class AppointmentRoom {
  constructor(
    public readonly token: StringValueObject,
    public readonly room: StringValueObject,
    public readonly url: StringValueObject,
  ) {}

  toPrimitives() {
    return {
      token: this.token.value,
      room: this.room.value,
      url: this.url.value,
    };
  }

  static fromPrimitives(data: Primitives<AppointmentRoom>) {
    return new AppointmentRoom(
      new StringValueObject(data.token),
      new StringValueObject(data.room),
      new StringValueObject(data.url),
    );
  }
}
