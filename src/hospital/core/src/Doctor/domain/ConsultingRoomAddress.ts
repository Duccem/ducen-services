import { BaseObject, Primitives, StringValueObject } from '@ducen/shared';
import { ConsultingRoomCoordinates } from './ConsultingRoomCoordinates';

export class ConsultingRoomAddress extends BaseObject {
  constructor(
    public country: StringValueObject,
    public city: StringValueObject,
    public street: StringValueObject,
    public zipCode: StringValueObject,
    public coordinates: ConsultingRoomCoordinates
  ) {
    super();
  }

  toPrimitives(): Primitives<ConsultingRoomAddress> {
    return {
      city: this.city.value,
      country: this.country.value,
      zipCode: this.zipCode.value,
      street: this.street.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }

  static fromPrimitives(data: Primitives<ConsultingRoomAddress>): ConsultingRoomAddress {
    return new ConsultingRoomAddress(
      new StringValueObject(data.country),
      new StringValueObject(data.city),
      new StringValueObject(data.street),
      new StringValueObject(data.zipCode),
      ConsultingRoomCoordinates.fromPrimitives(data.coordinates)
    );
  }
}
