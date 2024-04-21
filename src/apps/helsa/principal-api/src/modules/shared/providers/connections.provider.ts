import { MongoConnection, RabbitMQConnection, RedisConnection } from '@ducen/adapters';
import { Provider } from '@nestjs/common';
import { connect } from 'amqplib';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

export const connections: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: ['DATABASE_CONFIGURATION'],
    useFactory: async (databaseConf: any) => {
      const client = await MongoClient.connect(databaseConf.uri);
      return new MongoConnection(client);
    },
  },
  {
    provide: 'QUEUE_CONNECTION',
    inject: ['QUEUE_CONFIGURATION'],
    useFactory: async (queueConf: any) => {
      const connection = await connect(queueConf.uri);
      const channel = await connection.createConfirmChannel();
      await channel.prefetch(1);
      return new RabbitMQConnection(channel, connection);
    },
  },
  {
    provide: 'CACHE_CONNECTION',
    inject: ['CACHE_CONFIGURATION'],
    useFactory: async (configuration: any) => {
      const client = createClient({ url: configuration.uri });
      await client.connect();
      return new RedisConnection(client);
    },
  },
];
