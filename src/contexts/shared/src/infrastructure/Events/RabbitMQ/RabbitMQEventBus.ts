import { DomainEvent } from '../../../domain/Events/DomainEvent';
import { EventBus } from '../../../domain/Events/DomainEventBus';
import { DomainEventSubscriber } from '../../../domain/Events/DomainEventSubscriber';
import { Logger } from '../../../domain/Logger';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEventFailOverPublisher } from '../DomainEventFailOverPublisher';
import { DomainEventRegisterObservers } from '../DomainEventRegisterObservers';
import { RabbitMQConnection } from './RabbitMQConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';
import { RabbitMQFormatter } from './RabbitMQFormatter';

export class RabbitMQEventBus implements EventBus {
  private deserializer?: DomainEventDeserializer;
  private exchange = 'domain_events';
  constructor(
    private failOverPublisher: DomainEventFailOverPublisher,
    private connection: RabbitMQConnection,
    private vendor: string,
    private logger: Logger,
  ) {
    this.exchange = `${this.vendor}.domain_events`;
  }

  async configure(subscribers: DomainEventRegisterObservers): Promise<void> {
    const retryExchange = RabbitMQFormatter.formatExchangeRetryName(this.exchange);
    const deadLetterExchange = RabbitMQFormatter.formatExchangeDeadLetterName(this.exchange);
    await this.connection.exchange(this.exchange);
    await this.connection.exchange(retryExchange);
    await this.connection.exchange(deadLetterExchange);
    for (const subscriber of subscribers.subscribers) {
      await this.addQueue(subscriber, this.exchange);
    }
  }

  private async addQueue(subscriber: DomainEventSubscriber, exchange: string) {
    const retryExchange = RabbitMQFormatter.formatExchangeRetryName(exchange);
    const deadLetterExchange = RabbitMQFormatter.formatExchangeDeadLetterName(exchange);

    const routingKeys = RabbitMQFormatter.getRoutingKeysFor(subscriber);

    const queue = RabbitMQFormatter.formatQueue(subscriber);
    const deadLetterQueue = RabbitMQFormatter.formatQueueDeadLetter(subscriber);
    const retryQueue = RabbitMQFormatter.formatQueueRetry(subscriber);

    await this.connection.queue(exchange, queue, routingKeys);
    await this.connection.queue(retryExchange, retryQueue, [queue], exchange, queue, 500);
    await this.connection.queue(deadLetterExchange, deadLetterQueue, [queue]);
  }

  async addSubscribers(subscribers: DomainEventRegisterObservers): Promise<void> {
    await this.configure(subscribers);
    this.deserializer = DomainEventDeserializer.configure(subscribers.subscribers);
    for (const subscriber of subscribers.subscribers) {
      const queueName = RabbitMQFormatter.formatQueue(subscriber);
      const consumer = new RabbitMQConsumer(
        subscriber,
        this.connection,
        this.deserializer,
        queueName,
        this.exchange,
        3,
      );
      await this.connection.consume(queueName, consumer.onMessage.bind(consumer));
    }
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        const routingKey = event.eventName;
        const content = RabbitMQFormatter.toBuffer(event);
        const options = RabbitMQFormatter.eventOptions(event);

        await this.connection.publish(this.exchange, routingKey, content, options);
        await this.failOverPublisher.publish(event, true);
      } catch (error) {
        this.logger.error(
          `Error publishing event ${event.eventName} with aggregateId ${event.aggregateId}, the error was ${error}`,
        );
        await this.failOverPublisher.publish(event, false);
      }
    }
  }
}
