import { registerAs } from '@nestjs/config';

export default registerAs('llm', () => {
  return {
    hf: {
      apiKey: process.env.HUGGINGFACE_API_KEY || '',
    },
  };
});
