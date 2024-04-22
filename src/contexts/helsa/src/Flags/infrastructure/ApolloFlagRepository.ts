import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client';
import { ApolloRepository } from '@ducen/ports-client';
import { Flag } from '../domain/Flag';
import { FlagClientRepository } from '../domain/FlagRepository';

export class ApolloFlagRepository extends ApolloRepository<Flag> implements FlagClientRepository {
  constructor(client: ApolloClient<NormalizedCacheObject>) {
    super(client, Flag);
  }
  async getFlags(): Promise<any[]> {
    const result = await this.client.query({
      query: gql(`
        query getFlags {
          getFlags {
            name
            enabled
          }
        }`),
    });
    return result.data.getFlags;
  }

  async createFlag(flag: Flag): Promise<void> {
    await this.client.mutate({
      mutation: gql(`
        mutation createFlag($flag: FlagRegister!) {
          createFlag(flag: $flag)
        }`),
      variables: { flag },
    });
  }

  async updateFlag(flag: Flag): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async deleteFlag(flag: Flag): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
