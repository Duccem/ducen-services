import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    authKey: process.env.AUTH_KEY || '123456',
  };
});
