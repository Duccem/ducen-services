import { DomainEventFailOverPublisher } from '../../../../src/infrastructure/EventBus/DomainEventFailOverPublisher';
import { MockMongoConnectionFactory } from '../../Persistence/mongo/__mocks__/MockMongoConnectionFactory';
import { DomainEventFailoverPublisherDouble } from '../__mocks__/DomainEventFailoverPublisherDouble';
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother';

export class DomainEventFailoverPublisherMother {
  static async create() {
    const mongoClient = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL']);
    const failOver = new DomainEventFailOverPublisher(mongoClient);
    failOver.setDeserializer(DomainEventDeserializerMother.create());
    return failOver;
  }

  static failOverDouble() {
    const mongoClient = MockMongoConnectionFactory.double();
    return new DomainEventFailoverPublisherDouble(mongoClient);
  }
}
