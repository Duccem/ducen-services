import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { Constructor } from '../../../domain/types/Constructor';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { DocumentCreator } from './DocumentCreator';
export class MongoLlamaVectorStore<T> {
  private vectorStore: MongoDBAtlasVectorSearch;
  private documentSplitter = new DocumentCreator();
  constructor(
    private connection: MongoConnection,
    private model: Constructor<T>,
    config: { llmHost: string },
  ) {
    const collectionName = this.model.name.toLowerCase();
    this.vectorStore = new MongoDBAtlasVectorSearch(
      new OllamaEmbeddings({
        baseUrl: config.llmHost,
        model: 'llama3',
      }),
      {
        collection: this.connection.getConnection().collection(`${collectionName}_vectors`),
        indexName: `${collectionName}_index`,
        textKey: 'text',
        embeddingKey: 'embedding',
      },
    );
  }
  async saveKnowledgeBase(document: string): Promise<void> {
    const docs = await this.documentSplitter.createFromText(document);
    await this.vectorStore.addDocuments(docs);
  }

  getAsRetriever() {
    return this.vectorStore.asRetriever();
  }

  async queryDocuments(query: string, filter: any = {}): Promise<any> {
    return await this.vectorStore.similaritySearch(query, 10, { preFilter: filter });
  }
}
