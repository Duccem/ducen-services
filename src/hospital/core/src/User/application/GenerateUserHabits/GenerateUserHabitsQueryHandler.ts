import { Query, QueryHandler } from '@ducen/shared';
import { HabitsGenerator } from '../../domain/HabitsGenerator';
import { GenerateUserHabitsQuery } from './GenerateUserHabitsQuery';
import { UserHabitsGenerator } from './UserHabitsGenerator';

export class GenerateUserHabitsQueryHandler implements QueryHandler<GenerateUserHabitsQuery> {
  private generator: UserHabitsGenerator;
  constructor(habitsGenerator: HabitsGenerator) {
    this.generator = new UserHabitsGenerator(habitsGenerator);
  }

  subscribedTo(): Query {
    return GenerateUserHabitsQuery;
  }

  public async handle(query: GenerateUserHabitsQuery): Promise<any> {
    return await this.generator.run(query.user, query.physicInformation);
  }
}
