import { registerAs } from '@nestjs/config';

export default registerAs('video', () => {
  return {
    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID || '',
      apiKey: process.env.TWILIO_API_KEY || '',
      apiSecret: process.env.TWILIO_API_SECRET || '',
    },
  };
});
