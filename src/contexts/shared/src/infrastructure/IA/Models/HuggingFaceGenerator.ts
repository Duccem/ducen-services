import { HuggingFaceInferenceEmbeddings } from '@langchain/community/embeddings/hf';
import { HuggingFaceInference } from '@langchain/community/llms/hf';
import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnablePassthrough, RunnableSequence } from '@langchain/core/runnables';
import { formatDocumentsAsString } from 'langchain/util/document';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { MongoVectorStore } from '../VectorStores/MongoVectorStore';

export abstract class HuggingFaceGenerator {
  private model: HuggingFaceInference;
  private vectorStore: MongoVectorStore;
  constructor(connection: MongoConnection, apiKey: string, collectionName?: string) {
    this.vectorStore = new MongoVectorStore(connection, new HuggingFaceInferenceEmbeddings(), collectionName);
    this.model = new HuggingFaceInference({
      apiKey,
      model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
      temperature: 0.7,
      maxTokens: 50,
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
  async generateFromPrompt(messages: any[], query: string, context?: string): Promise<string> {
    const prompt = ChatPromptTemplate.fromMessages(messages);
    const chain = RunnableSequence.from([prompt, this.model, new JsonOutputParser()]);
    const answer = await chain.invoke({ query, context });
    return answer;
  }

  async saveKnowledgeBase(text: string): Promise<void> {
    await this.vectorStore.saveKnowledgeBase(text);
  }
}
