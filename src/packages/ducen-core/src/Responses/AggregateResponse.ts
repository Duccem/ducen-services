import { Aggregate } from '../Aggregate';
import { Response } from '../Response';

export class AggregateResponse extends Response {
  readonly data: Aggregate;
  constructor(message: string, data: Aggregate) {
    super(message, 200);
    this.data = data;
  }
  public formatResponse() {
    return {
      code: this.code,
      message: this.message,
      data: this.data.toPrimitives(),
    };
  }
}
