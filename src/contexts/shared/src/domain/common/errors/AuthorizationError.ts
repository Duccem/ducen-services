import { DomainError } from '../../core/DomainError';

export class AuthorizationError extends DomainError {
  constructor(message: string) {
    super(message);
  }
}
