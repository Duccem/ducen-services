import { Query, QueryHandler } from '@ducen-services/shared';
import { UserRepository } from '../../../User/domain/UserRepository';
import { FlagRepository } from '../../domain/FlagRepository';
import { GetFlagQuery } from './GetFlagQuery';
import { GetFlags } from './GetFlags';

export class GetFlagQueryHandler implements QueryHandler<GetFlagQuery> {
  private getFlags: GetFlags;
  constructor(flagRepository: FlagRepository, userRepository: UserRepository) {
    this.getFlags = new GetFlags(flagRepository, userRepository);
  }

  subscribedTo(): Query {
    return GetFlagQuery;
  }

  public async handle(query: GetFlagQuery): Promise<any> {
    return await this.getFlags.run(query.id);
  }
}
