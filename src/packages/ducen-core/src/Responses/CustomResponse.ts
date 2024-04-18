import { Response } from '../Response';

export class CustomResponse extends Response {
  readonly data: any;
  constructor(message: string, data: any) {
    super(message, 200);
    this.data = data;
  }
  public formatResponse() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  }
}
