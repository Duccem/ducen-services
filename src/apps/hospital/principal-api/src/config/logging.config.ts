import { registerAs } from '@nestjs/config';

export default registerAs('logging', () => {
  return {
    host: process.env.LOGGING_HOST,
    env: process.env.NODE_ENV,
    path: process.env.LOGGING_PATH,
    serviceName: process.env.SERVICE,
  };
});
