import { InternalError } from '../../../src/domain/Errors/InternalError';
import { InMemoryQueryBus } from '../../../src/infrastructure/Query/InMemoryQueryBus';
import { QueryHandlers } from '../../../src/infrastructure/Query/QueryHandlers';
import { DummyQuery } from './__mocks__/DummyQuery';
import { DummyQueryHandler } from './__mocks__/DummyQueryHandler';
import { UnhandledQuery } from './__mocks__/UnhandledQuery';

describe('InMemoryQueryBus', () => {
  it('throws an error if dispatches a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlers = new QueryHandlers([]);
    const queryBus = new InMemoryQueryBus(queryHandlers);

    expect(queryBus.ask(unhandledQuery)).rejects.toBeInstanceOf(InternalError);
  });

  it('accepts a query with handler', async () => {
    const handledQuery = new DummyQuery();
    const myQueryHandler = new DummyQueryHandler();
    const queryHandlers = new QueryHandlers([myQueryHandler]);
    const queryBus = new InMemoryQueryBus(queryHandlers);

    const response = await queryBus.ask(handledQuery);
    expect(response).toEqual({});
  });
});
