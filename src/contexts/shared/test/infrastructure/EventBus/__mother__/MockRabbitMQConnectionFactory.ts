import { ConfirmChannel, Connection } from 'amqplib';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';
import { RabbitMQConnectionFactory } from '../../../../src/infrastructure/Events/RabbitMQ/RabbitMQConnectionFactory';

export class MockRabbitMQConnectionFactory extends RabbitMQConnectionFactory {
  static failOnPublish() {
    return new RabbitMQConnectionDouble(null as unknown as ConfirmChannel, null as unknown as Connection);
  }
}
