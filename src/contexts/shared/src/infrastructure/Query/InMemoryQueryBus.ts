import { Query } from '../../domain/Query';
import { QueryBus } from '../../domain/QueryBus';
import { QueryHandler } from '../../domain/QueryHandler';
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
