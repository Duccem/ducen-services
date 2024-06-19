import { DomainEventFailOverPublisher } from '../../../src/infrastructure/Events/DomainEventFailOverPublisher';
import { MongoArranger } from '../../../src/infrastructure/Persistence/Mongo/MongoArranger';
import { MongoConnection } from '../../../src/infrastructure/Persistence/Mongo/MongoConnection';
import { MongoConnectionFactory } from '../../../src/infrastructure/Persistence/Mongo/MongoConnectionFactory';

import { DomainEventDummyMother } from '../../domain/Events/DomainEventDummyMother';
import { DomainEventDeserializerMother } from './__mother__/DomainEventDeserializerMother';

describe('DomainEventFailoverPublisher test', () => {
  let arranger: MongoArranger;
  let mongoClient: MongoConnection;
  const deserializer = DomainEventDeserializerMother.create();

  beforeAll(async () => {
    mongoClient = await MongoConnectionFactory.create(process.env['MONGO_DB_URL']);
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
