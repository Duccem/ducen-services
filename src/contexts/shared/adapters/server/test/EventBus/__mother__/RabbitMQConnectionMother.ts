import { ConfirmChannel, Connection, connect } from 'amqplib';
import { RabbitMQConnectionDouble } from '../__mocks__/RabbitMQConnectionDouble';
import { RabbitMQConnection } from '../../../src/Events/RabbitMQ/RabbitMQConnection';

export class RabbitMQConnectionMother {
  static async create() {
    const connection = await connect(process.env['RABBIT' + '_MQ' + '_URL'] || 'amqp://localhost:5672');
    const channel = await connection.createConfirmChannel();
    await channel.prefetch(1);
    return new RabbitMQConnection(channel, connection);
  }

  static failOnPublish() {
    return new RabbitMQConnectionDouble(null as unknown as ConfirmChannel, null as unknown as Connection);
  }
}
