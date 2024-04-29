import { DomainEvent } from '../../../src/domain/Events/DomainEvent';
import { DomainEventDeserializer } from '../../../src/infrastructure/Events/DomainEventDeserializer';
import { DomainEventFailOverPublisher } from '../../../src/infrastructure/Events/DomainEventFailOverPublisher';
import { DomainEventRegisterObservers } from '../../../src/infrastructure/Events/DomainEventRegisterObservers';
import { RabbitMQConnection } from '../../../src/infrastructure/Events/RabbitMQ/RabbitMQConnection';
import { RabbitMQConsumer } from '../../../src/infrastructure/Events/RabbitMQ/RabbitMQConsumer';
import { RabbitMQEventBus } from '../../../src/infrastructure/Events/RabbitMQ/RabbitMQEventBus';
import { RabbitMQFormatter } from '../../../src/infrastructure/Events/RabbitMQ/RabbitMQFormatter';
import { ConsoleLogger } from '../../../src/infrastructure/Logging/ConsoleLogger';
import { MongoArranger } from '../../../src/infrastructure/Persistence/Mongo/MongoArranger';
import { DomainEventDummyMother } from '../../domain/Events/DomainEventDummyMother';
import { MockMongoConnectionFactory } from '../Persistence/mongo/__mocks__/MockMongoConnectionFactory';
import { DomainEventSubscriberDummy } from './__mocks__/DomainEventSubscriberDummy';
import { DomainEventFailoverPublisherMother } from './__mother__/DomainEventFailoverPublisherMother';
import { MockRabbitMQConnectionFactory } from './__mother__/MockRabbitMQConnectionFactory';

describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events';
  let arranger: MongoArranger;

  beforeAll(async () => {
    const connection = await MockMongoConnectionFactory.create(process.env['MONGO_DB_URL']);
    arranger = new MongoArranger(connection);
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  afterAll(async () => {
    await arranger.arrange();
    await arranger.close();
  });

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = MockRabbitMQConnectionFactory.failOnPublish();
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble();
      const eventBus = new RabbitMQEventBus(
        failoverPublisher,
        connection,
        'test',
        new ConsoleLogger({ serviceName: 'test-ducen', environment: 'test' }),
      );
      const event = DomainEventDummyMother.random();

      await eventBus.publish([event]);

      failoverPublisher.assertEventHasBeenPublished(event);
    });
  });
  describe('integration', () => {
    let rabbitConnection: RabbitMQConnection;
    let dummySubscriber: DomainEventSubscriberDummy;
    let failoverPublisher: DomainEventFailOverPublisher;
    beforeAll(async () => {
      rabbitConnection = await MockRabbitMQConnectionFactory.create();
      failoverPublisher = await DomainEventFailoverPublisherMother.create();
    });
    beforeEach(async () => {
      await arranger.arrange();
      dummySubscriber = new DomainEventSubscriberDummy();
    });

    afterEach(async () => {
      await cleanEnvironment();
    });

    afterAll(async () => {
      await rabbitConnection.close();
    });

    it('should consume the events published to RabbitMQ', async () => {
      dummySubscriber = new DomainEventSubscriberDummy();
      const eventBus = new RabbitMQEventBus(
        failoverPublisher,
        rabbitConnection,
        'test',
        new ConsoleLogger({ serviceName: 'test-ducen', environment: 'test' }),
      );
      await eventBus.addSubscribers(new DomainEventRegisterObservers([dummySubscriber]));
      const event = DomainEventDummyMother.random();

      await eventBus.publish([event]);

      await dummySubscriber.assertConsumedEvents([event]);
    });

    it('should retry failed domain events', async () => {
      dummySubscriber = DomainEventSubscriberDummy.failsFirstTime();
      const eventBus = new RabbitMQEventBus(
        failoverPublisher,
        rabbitConnection,
        'test',
        new ConsoleLogger({ serviceName: 'test-ducen', environment: 'test' }),
      );
      await eventBus.addSubscribers(new DomainEventRegisterObservers([dummySubscriber]));
      const event = DomainEventDummyMother.random();

      await eventBus.publish([event]);
      await dummySubscriber.assertConsumedEvents([event]);
    });

    it('it should send events to dead letter after retry failed', async () => {
      dummySubscriber = DomainEventSubscriberDummy.alwaysFails();
      const eventBus = new RabbitMQEventBus(
        failoverPublisher,
        rabbitConnection,
        'test',
        new ConsoleLogger({ serviceName: 'test-ducen', environment: 'test' }),
      );
      await eventBus.addSubscribers(new DomainEventRegisterObservers([dummySubscriber]));
      const event = DomainEventDummyMother.random();

      await eventBus.publish([event]);
      await dummySubscriber.assertConsumedEvents([]);
      assertDeadLetter([event]);
    });

    async function cleanEnvironment() {
      await rabbitConnection.deleteQueue(RabbitMQFormatter.formatQueue(dummySubscriber));
      await rabbitConnection.deleteQueue(RabbitMQFormatter.formatQueueRetry(dummySubscriber));
      await rabbitConnection.deleteQueue(RabbitMQFormatter.formatQueueDeadLetter(dummySubscriber));
    }

    async function assertDeadLetter(events: Array<DomainEvent>) {
      const deadLetterQueue = RabbitMQFormatter.formatQueueDeadLetter(dummySubscriber);
      const deadLetterSubscriber = new DomainEventSubscriberDummy();
      const deserializer = DomainEventDeserializer.configure([deadLetterSubscriber]);
      const consumer = new RabbitMQConsumer(
        deadLetterSubscriber,
        rabbitConnection,
        deserializer,
        deadLetterQueue,
        exchange,
        3,
      );
      await rabbitConnection.consume(deadLetterQueue, consumer.onMessage.bind(consumer));

      await deadLetterSubscriber.assertConsumedEvents(events);
    }
  });
});
