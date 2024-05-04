import { Ollama } from '@langchain/community/llms/ollama';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { MongoLlamaVectorStore } from './MongoLlamaVectorStore';

export abstract class LlamaGenerator {
  private model: Ollama;
  private vectorStore: MongoLlamaVectorStore;
  constructor(connection: MongoConnection, url: string, model?: string, collectionName?: string) {
    this.vectorStore = new MongoLlamaVectorStore(connection, collectionName);
    this.model = new Ollama({
      model: model ? model : 'llama3',
      temperature: 0,
      baseUrl: url,
    });
  }

  async generate(messages: any[], query: string, context?: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
      {
        context: context ? () => context : this.vectorStore.getAsRetriever().pipe(formatDocumentsAsString),
        query: new RunnablePassthrough(),
      },
      prompt,
      this.model,
      new JsonOutputParser(),
    ]);
    const answer = await chain.invoke(query);
    return answer;
  }
}
