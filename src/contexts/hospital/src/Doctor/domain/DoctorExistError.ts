import { FormatError } from '@ducen-services/shared';

export class DoctorExistError extends FormatError {
  constructor() {
    super(`The doctor already exists`);
  }
}
