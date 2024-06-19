import { QueryHandler } from '../../../../src/domain/core/Query';
import { DummyQuery } from './DummyQuery';

export class DummyQueryHandler implements QueryHandler<DummyQuery> {
  subscribedTo(): DummyQuery {
    return DummyQuery;
  }

  async handle(query: DummyQuery): Promise<any> {
    return {};
  }
}
