import { registerAs } from '@nestjs/config';

export default registerAs('llm', () => {
  return {
    hf: {
      apiKey: process.env.HUGGINGFACE_API_KEY || '',
    },
    ollama: {
      llmHost: process.env.OLLAMA_LLM_HOST || '',
    },
    vectorStore: process.env.VECTOR_STORE_URL || '',
  };
});
