import { MongoConnection, RabbitMQConnection, RedisConnection } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { connect } from 'amqplib';
import { MongoClient } from 'mongodb';
import { createClient } from 'redis';

export const connections: Provider[] = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: ['CONNECTION_CONFIGURATION'],
    useFactory: async (databaseConf: any) => {
      const client = await MongoClient.connect(databaseConf.database_uri);
      return new MongoConnection(client);
    },
  },
  {
    provide: 'VECTOR_STORE_CONNECTION',
    inject: ['LLM_CONFIGURATION'],
    useFactory: async (llmConf: any) => {
      const client = await MongoClient.connect(llmConf.vectorStore);
      return new MongoConnection(client);
    },
  },
  {
    provide: 'QUEUE_CONNECTION',
    inject: ['CONNECTION_CONFIGURATION'],
    useFactory: async (queueConf: any) => {
      const connection = await connect(queueConf.message_queue_uri);
      const channel = await connection.createConfirmChannel();
      await channel.prefetch(1);
      return new RabbitMQConnection(channel, connection);
    },
  },
  {
    provide: 'CACHE_CONNECTION',
    inject: ['CONNECTION_CONFIGURATION'],
    useFactory: async (configuration: any) => {
      const client = createClient({ url: configuration.cache_uri });
      await client.connect();
      return new RedisConnection(client);
    },
  },
];
