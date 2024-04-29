import { Query } from '../../domain/Query/Query';
import { QueryBus } from '../../domain/Query/QueryBus';
import { QueryHandler } from '../../domain/Query/QueryHandler';
import { QueryHandlers } from './QueryHandlers';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlers) {}

  async ask(query: Query): Promise<any> {
    const handler = this.queryHandlersInformation.get(query);
    const response = await handler.handle(query);
    return response;
  }
  public addQueryHandlers(queryHandlers: Array<QueryHandler<Query>>): void {
    this.queryHandlersInformation.addQueryHandlers(queryHandlers);
  }
}
