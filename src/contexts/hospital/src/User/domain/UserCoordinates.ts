import { BaseObject, Latitude, Longitude, Primitives } from '@ducen-services/shared';

export class UserCoordinates extends BaseObject {
  constructor(public latitude: Latitude, public longitude: Longitude) {
    super();
  }
  public static fromPrimitives(data: Primitives<UserCoordinates>): UserCoordinates {
    return new UserCoordinates(new Latitude(data.latitude), new Longitude(data.longitude));
  }
  public toPrimitives(): Primitives<UserCoordinates> {
    return {
      latitude: this.latitude.value,
      longitude: this.longitude.value,
    };
  }
}
