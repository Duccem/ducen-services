import { DomainError } from '../DomainError';

export class InternalError extends DomainError {
  constructor(message: string) {
    super(message, 500);
  }
}
