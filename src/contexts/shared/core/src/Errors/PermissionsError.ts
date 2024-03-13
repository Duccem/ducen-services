import { DomainError } from '../DomainError';

export class PermissionsError extends DomainError {
  constructor(message: string) {
    super(message, 403);
  }
}
