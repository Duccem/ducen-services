import { InternalError, Query, QueryHandler } from '@shared/core';

export class QueryHandlers extends Map<Query, QueryHandler<Query>> {
  constructor(queryHandlers: Array<QueryHandler<Query>>) {
    super();
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query): QueryHandler<Query> {
    const queryHandler = super.get(query.constructor);

    if (!queryHandler) {
      throw new InternalError(`The query <${query.constructor.name}> hasn't a query handler associated`);
    }

    return queryHandler;
  }

  public addQueryHandlers(queryHandlers: Array<QueryHandler<Query>>): void {
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }
}
