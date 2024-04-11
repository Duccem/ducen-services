import { Query } from './Query';
import { QueryHandler } from './QueryHandler';

export interface QueryBus {
  ask<T>(query: Query): Promise<T>;
  addQueryHandlers(queryHandlers: Array<QueryHandler<Query>>): void;
}
