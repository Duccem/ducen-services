import { DomainEventFailOverPublisher } from '../../src/Events/DomainEventFailOverPublisher';
import { MongoConnection } from '../../src/Persistence/Mongo/MongoConnection';
import { MongoArranger } from '../Persistence/mongo/MongoArranger';

import { DomainEventDeserializerMother } from './__mother__/DomainEventDeserializerMother';
import { DomainEventDummyMother } from './__mother__/DomainEventDummyMother';
import { RabbitMQMongoClientMother } from './__mother__/RabbitMQMongoClientMother';

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MongoArranger;
  let mongoClient: MongoConnection;
  const deserializer = DomainEventDeserializerMother.create();

  beforeAll(async () => {
    mongoClient = await RabbitMQMongoClientMother.create();
    arranger = new MongoArranger(mongoClient);
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  afterAll(async () => {
    await arranger.arrange();
    await arranger.close();
  });

  it('should save the published events', async () => {
    const eventBus = new DomainEventFailOverPublisher(mongoClient);
    eventBus.setDeserializer(deserializer);
    const event = DomainEventDummyMother.random();

    await eventBus.publish(event, false);

    expect(await eventBus.consume()).toEqual([event]);
  });
});
