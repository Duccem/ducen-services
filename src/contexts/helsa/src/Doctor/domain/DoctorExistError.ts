import { FormatError } from '@shared/core';

export class DoctorExistError extends FormatError {
  constructor() {
    super(`The doctor already exists`);
  }
}
