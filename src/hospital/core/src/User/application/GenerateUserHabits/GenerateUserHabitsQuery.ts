import { Query } from '@ducen/shared';
import { User } from '../../../..';

export class GenerateUserHabitsQuery extends Query {
  constructor(public user: User, public physicInformation: any) {
    super();
  }
}
