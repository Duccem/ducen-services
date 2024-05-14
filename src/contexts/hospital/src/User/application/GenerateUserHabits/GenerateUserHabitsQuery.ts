import { Query } from '@ducen-services/shared';

export class GenerateUserHabitsQuery extends Query {
  constructor(
    public userId: string,
    public physicInformation: any,
  ) {
    super();
  }
}
