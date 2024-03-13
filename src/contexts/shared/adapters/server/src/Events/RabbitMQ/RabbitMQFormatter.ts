import { DomainEvent, DomainEventSubscriber } from '@shared/core';
import { DomainEventSerializer } from '../DomainEventSerializer';

export class RabbitMQFormatter {
  static formatQueueArguments(params: { deadLetterExchange?: string; deadLetterQueue?: string; messageTtl?: number }) {
    let args: any = {};
    if (params.deadLetterExchange) {
      args = { ...args, 'x-dead-letter-exchange': params.deadLetterExchange };
    }
    if (params.deadLetterQueue) {
      args = { ...args, 'x-dead-letter-routing-key': params.deadLetterQueue };
    }
    if (params.messageTtl) {
      args = { ...args, 'x-message-ttl': params.messageTtl };
    }

    return args;
  }

  static formatExchangeRetryName(exchange: string): string {
    return `${exchange}.retry`;
  }

  static formatExchangeDeadLetterName(exchange: string): string {
    return `${exchange}.dead_letter`;
  }

  static formatQueue(subscriber: DomainEventSubscriber) {
    return `${subscriber.name()}`;
  }

  static formatQueueRetry(subscriber: DomainEventSubscriber) {
    return `${subscriber.name()}.retry`;
  }

  static formatQueueDeadLetter(subscriber: DomainEventSubscriber) {
    return `${subscriber.name()}.dead_letter`;
  }

  static eventOptions(event: DomainEvent) {
    return {
      messageId: event.eventId,
      contentType: 'application/json',
      contentEncoding: 'utf-8',
    };
  }

  static toBuffer(event: DomainEvent): Buffer {
    const eventPrimitives = DomainEventSerializer.serialize(event);

    return Buffer.from(eventPrimitives);
  }

  static getRoutingKeysFor(subscriber: DomainEventSubscriber) {
    const routingKeys = subscriber.subscribedTo().map((event) => event.EVENT_NAME);

    const queue = this.formatQueue(subscriber);
    routingKeys.push(queue);

    return routingKeys;
  }
}
