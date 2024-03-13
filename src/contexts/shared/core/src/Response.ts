export abstract class Response {
  readonly code: number;
  readonly message: string;

  constructor(message: string, code: number) {
    this.message = message;
    this.code = code;
  }

  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public abstract formatResponse(): any;
}
