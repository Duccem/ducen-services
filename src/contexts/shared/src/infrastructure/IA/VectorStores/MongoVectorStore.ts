import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
import { DocumentCreator } from '../DocumentCreators/DocumentCreator';
export class MongoVectorStore {
  private vectorStore: MongoDBAtlasVectorSearch;
  private documentSplitter = new DocumentCreator();
  constructor(
    private connection: MongoConnection,
    embeddings: any,
    collectionName: string = 'llama_vector_store',
  ) {
    this.vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: this.connection.getCollection(collectionName),
      indexName: `${collectionName}_index`,
      textKey: 'text',
      embeddingKey: 'embedding',
    });
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
