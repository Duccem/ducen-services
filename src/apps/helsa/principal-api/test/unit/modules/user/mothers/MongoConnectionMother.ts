import { MongoConnection } from '@ducen/server';
import { MongoClient } from 'mongodb';

export class MongoConnectionMother {
  static async create(db?: string) {
    const client = await MongoClient.connect(process.env['MONGO_DB_URL'] || `mongodb://localhost:27017/${db || 'test-ducen'}`);
    return new MongoConnection(client);
  }

  static double() {
    return new MongoConnection(null as unknown as MongoClient);
  }
}
