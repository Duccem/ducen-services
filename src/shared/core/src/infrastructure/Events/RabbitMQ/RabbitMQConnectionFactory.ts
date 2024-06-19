import { connect } from 'amqplib';
import { RabbitMQConnection } from './RabbitMQConnection';
export class RabbitMQConnectionFactory {
  static async create() {
    const connection = await connect(process.env['RABBIT' + '_MQ' + '_URL'] || 'amqp://localhost:5672');
    const channel = await connection.createConfirmChannel();
    await channel.prefetch(1);
    return new RabbitMQConnection(channel, connection);
  }
}
