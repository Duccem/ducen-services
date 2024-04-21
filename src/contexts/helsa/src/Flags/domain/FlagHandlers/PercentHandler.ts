import { User } from '../../../User/domain/User';
import { Flag } from '../Flag';

export class PercentHandler {
  constructor(
    private readonly flag: Flag,
    private readonly user: User,
  ) {}
  handle() {
    return Math.random() < this.flag.attributes.value?.percent * 0.01;
  }
}
