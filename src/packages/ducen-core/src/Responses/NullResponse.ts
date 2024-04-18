import { Response } from '../Response';

export class NullResponse extends Response {
  constructor(message: string) {
    super(message, 201);
  }

  public formatResponse() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}
