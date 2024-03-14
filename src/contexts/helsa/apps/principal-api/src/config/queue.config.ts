import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => {
  return {
    uri: process.env.MESSAGE_QUEUE_URI,
  };
});
