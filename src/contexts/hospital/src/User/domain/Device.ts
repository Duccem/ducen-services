import { DateValueObject, Entity, Uuid } from '@ducen-services/shared';
import { DeviceAgent } from './DeviceAgent';
import { DeviceToken } from './DeviceToken';

export class Device extends Entity {
  constructor(
    id: Uuid,
    public agent: DeviceAgent,
    public token: DeviceToken,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      agent: this.agent.value,
      token: this.token.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  public static fromPrimitives(data: any) {
    return new Device(
      new Uuid(data.id),
      new DeviceAgent(data.agent),
      new DeviceToken(data.token),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  public static create(id: Uuid, agent: DeviceAgent, token: DeviceToken) {
    return new Device(id, agent, token, DateValueObject.today(), DateValueObject.today());
  }
}
