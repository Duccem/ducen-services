import { DomainError } from '../DomainError';

export class FormatError extends DomainError {
  constructor(message: string) {
    super(message, 400);
  }
}
