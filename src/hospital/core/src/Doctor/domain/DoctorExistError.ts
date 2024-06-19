import { FormatError } from '@ducen/shared';

export class DoctorExistError extends FormatError {
  constructor() {
    super(`The doctor already exists`);
  }
}
