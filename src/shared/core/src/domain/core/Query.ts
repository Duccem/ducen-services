/**
 * @name Query
 * @description Interface for Query
 */
export abstract class Query {}

/**
 * @name QueryBus
 * @description Interface for QueryBus, which is responsible for handling queries and returning the result
 */
export interface QueryBus {
  /**
   * @name ask
   * @description Method to ask the query
   * @param query Query
   */
  ask<T>(query: Query): Promise<T>;

  /**
   * @name addQueryHandlers
   * @description Method to add query handlers
   * @param {Array<QueryHandler<Query>>} queryHandlers
   */
  addQueryHandlers(queryHandlers: Array<QueryHandler<Query>>): void;

  /**
   * @name addHandler
   * @description Method to add a query handler
   * @param handler QueryHandler<Query>
   */
  addHandler(handler: QueryHandler<Query>): void;
}

/**
 * @name QueryHandler
 * @description Interface for QueryHandler, which is responsible for handling queries
 */
export interface QueryHandler<Q extends Query> {
  /**
   * @name subscribedTo
   * @description Method to return the query that the handler is subscribed to
   */
  subscribedTo(): Query;

  /**
   * @name handle
   * @description Method to handle the query
   * @param query Query
   */
  handle(query: Q): Promise<any>;
}
