import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { MongoConnection } from '../../Persistence/Mongo/MongoConnection';
export class MongoVectorStore {
  private vectorStore: MongoDBAtlasVectorSearch;
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
  async saveKnowledgeBase(text: string): Promise<void> {
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
    const docs = await textSplitter.createDocuments([text]);
    await this.vectorStore.addDocuments(docs);
  }

  getAsRetriever() {
    return this.vectorStore.asRetriever();
  }
}
