import { DomainEventFailOverPublisher } from '../../../src/Events/DomainEventFailOverPublisher';
import { DomainEventFailoverPublisherDouble } from '../__mocks__/DomainEventFailoverPublisherDouble';
import { DomainEventDeserializerMother } from './DomainEventDeserializerMother';
import { RabbitMQMongoClientMother } from './RabbitMQMongoClientMother';

export class DomainEventFailoverPublisherMother {
  static async create() {
    const mongoClient = await RabbitMQMongoClientMother.create();
    const failOver = new DomainEventFailOverPublisher(mongoClient);
    failOver.setDeserializer(DomainEventDeserializerMother.create());
    return failOver;
  }

  static failOverDouble() {
    const mongoClient = RabbitMQMongoClientMother.double();
    return new DomainEventFailoverPublisherDouble(mongoClient);
  }
}
