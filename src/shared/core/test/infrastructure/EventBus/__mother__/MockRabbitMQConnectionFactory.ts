import { ConfirmChannel, Connection } from 'amqplib';
import { RabbitMQConnectionFactory } from '../../../../src/infrastructure/EventBus/RabbitMQ/RabbitMQConnectionFactory';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';

export class MockRabbitMQConnectionFactory extends RabbitMQConnectionFactory {
  static failOnPublish() {
    return new RabbitMQConnectionDouble(null as unknown as ConfirmChannel, null as unknown as Connection);
  }
}
