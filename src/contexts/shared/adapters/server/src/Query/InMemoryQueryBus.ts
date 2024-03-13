import { Query, QueryBus } from '@shared/core';
import { QueryHandlers } from './QueryHandlers';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlers) {}

  async ask(query: Query): Promise<any> {
    const handler = this.queryHandlersInformation.get(query);
    const response = await handler.handle(query);
    return response;
  }
}
