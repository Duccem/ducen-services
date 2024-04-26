import { MongoClient } from 'mongodb';
import { MongoConnection } from './MongoConnection';

export class MongoConnectionFactory {
  static async create(host: string, db?: string) {
    const client = await MongoClient.connect(host || `mongodb://localhost:27017/${db || 'test-ducen'}`);
    return new MongoConnection(client, db);
  }
}
