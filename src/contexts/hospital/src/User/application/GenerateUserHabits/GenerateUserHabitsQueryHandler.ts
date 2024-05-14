import { Query, QueryHandler } from '@ducen-services/shared';
import { HabitsGenerator } from '../../domain/HabitsGenerator';
import { UserRepository } from '../../domain/UserRepository';
import { UserSearcher } from '../SearchUser/UserSearcher';
import { GenerateUserHabitsQuery } from './GenerateUserHabitsQuery';
import { UserHabitsGenerator } from './UserHabitsGenerator';

export class GenerateUserHabitsQueryHandler implements QueryHandler<GenerateUserHabitsQuery> {
  private generator: UserHabitsGenerator;
  constructor(habitsGenerator: HabitsGenerator, userRepository: UserRepository) {
    this.generator = new UserHabitsGenerator(habitsGenerator, new UserSearcher(userRepository));
  }

  subscribedTo(): Query {
    return GenerateUserHabitsQuery;
  }

  public async handle(query: GenerateUserHabitsQuery): Promise<any> {
    return await this.generator.run(query.userId, query.physicInformation);
  }
}
