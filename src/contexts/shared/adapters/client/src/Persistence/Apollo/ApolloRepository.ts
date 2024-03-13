/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import pluralize from 'pluralize';
import { ApolloCriteriaConverter } from './ApolloCriteriaConverter';
import { Aggregate, NewableClass, Criteria } from '@shared/core';

export class ApolloRepository<T extends Aggregate> {
  protected converter = new ApolloCriteriaConverter();
  constructor(
    protected client: ApolloClient<NormalizedCacheObject>,
    private entity: NewableClass<T>,
  ) {}
  protected get model() {
    return this.entity.name.toLowerCase();
  }
  protected async searchByCriteria(criteria?: Criteria): Promise<T[]> {
    const { query, variables } = this.converter.Query(this.model, ['_id'], criteria);
    const result = await this.client.query({ query, variables });
    const elements: any[] = result.data[pluralize(this.model)];
    return elements.map((element) => new this.entity(element));
  }
  async persist(id: string, data: T): Promise<void> {
    const { mutation, variables } = this.converter.Mutation(this.model, { ...data, id });
    await this.client.mutate({ mutation, variables });
  }
}
