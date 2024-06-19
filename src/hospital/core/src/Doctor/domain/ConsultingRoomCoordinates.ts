import { BaseObject, Latitude, Longitude, Primitives } from '@ducen/shared';

export class ConsultingRoomCoordinates extends BaseObject {
  constructor(public latitude: Latitude, public longitude: Longitude) {
    super();
  }

  toPrimitives(): Primitives<ConsultingRoomCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }

  static fromPrimitives(data: Primitives<ConsultingRoomCoordinates>): ConsultingRoomCoordinates {
    return new ConsultingRoomCoordinates(new Latitude(data.latitude), new Longitude(data.longitude));
  }
}
