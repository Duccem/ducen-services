import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => {
  return {
    secretKey: process.env.STRIPE_SECRET_KEY,
  };
});
