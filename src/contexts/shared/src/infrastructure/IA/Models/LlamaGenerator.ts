import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { Ollama } from '@langchain/community/llms/ollama';
import { JsonOutputParser, StructuredOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { ZodSchema } from 'zod';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { MongoVectorStore } from '../VectorStores/MongoVectorStore';

export abstract class LlamaGenerator {
  private model: Ollama;
  private vectorStore: MongoVectorStore;
  constructor(connection: MongoConnection, url: string, model?: string, collectionName?: string) {
    this.vectorStore = new MongoVectorStore(connection, new OllamaEmbeddings(), collectionName);
    this.model = new Ollama({
      model: model ? model : 'llama3',
      temperature: 0,
      baseUrl: url,
    });
  }

  async generateFromEmbeddings(messages: any[], query: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([
      {
        context: this.vectorStore.getAsRetriever().pipe(formatDocumentsAsString),
        query: new RunnablePassthrough(),
      },
      prompt,
      this.model,
      new JsonOutputParser(),
    ]);
    const answer = await chain.invoke(query);
    return answer;
  }

  async generateFromPrompt<T>({
    messages,
    query,
    context,
    structure,
  }: {
    messages: any[];
    query: string;
    context?: string;
    structure: ZodSchema<T>;
  }): Promise<T> {
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const outputParser = StructuredOutputParser.fromZodSchema(structure);
    const chain = RunnableSequence.from([prompt, this.model, outputParser]);
    const answer = await chain.invoke({ query, context, format_instructions: outputParser.getFormatInstructions() });
    return answer;
  }

  async saveKnowledgeBase(text: string): Promise<void> {
    await this.vectorStore.saveKnowledgeBase(text);
  }
}
