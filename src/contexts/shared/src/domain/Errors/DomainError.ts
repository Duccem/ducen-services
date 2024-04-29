/**
 * Representation of a domain error that can be thrown by the domain layer.
 */
export class DomainError extends Error {
  protected readonly code: number;
  protected readonly timestamp: string;
  constructor(message: string, code: number) {
    super(message);
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
  public getCode(): number {
    return this.code;
  }

  public getMessage(): string {
    return this.message;
  }

  public getTimestamp(): string {
    return this.timestamp;
  }
}
