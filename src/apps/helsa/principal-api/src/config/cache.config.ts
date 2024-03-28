import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => {
  return {
    uri: process.env.CACHE_URI,
  };
});
