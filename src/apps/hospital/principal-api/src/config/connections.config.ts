import { registerAs } from '@nestjs/config';

export default registerAs('connections', () => {
  return {
    database_uri: process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/ducen2',
    message_queue_uri: process.env.MESSAGE_QUEUE_URI || 'amqp://localhost',
    cache_uri: process.env.CACHE_URI || 'redis://localhost:6379',
  };
});
