import { Query } from '@ducen-services/shared';
import { User } from '../../../..';

export class GenerateUserHabitsQuery extends Query {
  constructor(
    public user: User,
    public physicInformation: any,
  ) {
    super();
  }
}
