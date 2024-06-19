import { registerAs } from '@nestjs/config';

export default registerAs('payment', () => {
  return {
    stripe: {
      secretKey: process.env.STRIPE_SECRET_KEY,
    },
  };
});
