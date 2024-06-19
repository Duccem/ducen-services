import { RabbitMQConnection } from '../../../../src/infrastructure/Events/RabbitMQ/RabbitMQConnection';

export class RabbitMQConnectionDouble extends RabbitMQConnection {
  async publish(params: any): Promise<void> {
    throw new Error();
  }
}
