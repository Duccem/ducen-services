import { DeviceAgent } from './DeviceAgent';
import { DeviceToken } from './DeviceToken';

export class Device {
  constructor(
    public agent: DeviceAgent,
    public token: DeviceToken,
  ) {}

  public toPrimitives() {
    return {
      agent: this.agent.value,
      token: this.token.value,
    };
  }

  public static fromPrimitives(data: any) {
    return new Device(new DeviceAgent(data.agent), new DeviceToken(data.token));
  }

  public static create(agent: DeviceAgent, token: DeviceToken) {
    return new Device(agent, token);
  }
}
