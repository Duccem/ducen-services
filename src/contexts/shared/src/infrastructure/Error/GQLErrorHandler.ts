import { InternalError } from '../../domain/common/errors/InternalError';
import { DomainError } from '../../domain/core/DomainError';

export function GraphQLErrorHandling(gqlError: any, e: any) {
  let error: DomainError;
  if (e.originalError.thrownValue instanceof DomainError) {
    error = e.originalError.thrownValue;
  } else {
    error = new InternalError(gqlError.message);
  }
  return {
    message: error.getMessage(),
    timestamp: error.getTimestamp(),
  };
}
