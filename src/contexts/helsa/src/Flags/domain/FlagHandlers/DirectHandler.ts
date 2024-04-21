import { User } from '../../../User/domain/User';
import { Flag } from '../Flag';

export class DirectHandler {
  constructor(
    private readonly flag: Flag,
    private readonly user: User,
  ) {}

  handle(): boolean {
    return this.flag.enabled.value;
  }
}
