import { NotFoundError } from '@ducen-services/shared';

export class UserNotExist extends NotFoundError {
  constructor() {
    super(`User not exist`);
  }
}
