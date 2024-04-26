import { DirectHandler } from './FlagHandlers/DirectHandler';
import { PercentHandler } from './FlagHandlers/PercentHandler';

export class HandlerFactory {
  static handlers = {
    PERCENT: (flag: any, user: any) => new PercentHandler(flag, user),
    DIRECT: (flag: any, user: any) => new DirectHandler(flag, user),
  };
  static create(handler: string, flag: any, user: any) {
    return this.handlers[handler](flag, user);
  }
}
