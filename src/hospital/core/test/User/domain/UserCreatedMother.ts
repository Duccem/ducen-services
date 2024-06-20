import { User } from '../../../src/User/domain/User';
import { UserCreated } from '../../../src/User/domain/events/UserCreated';

export class UserCreatedDomainEventMother {
  static fromUser(user: User): UserCreated {
    return new UserCreated({
      aggregateId: user.id.value,
      params: user.toPrimitives(),
    });
  }
}
