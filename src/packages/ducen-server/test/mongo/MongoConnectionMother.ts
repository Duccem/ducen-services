import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../src/Persistence/Mongo/MongoConnection';

export class MongoConnectionMother {
  static async create(db?: string) {
    const client = await MongoClient.connect(process.env['MONGO_DB_URL'] || `mongodb://localhost:27017/${db || 'test-ducen'}`);
    return new MongoConnection(client);
  }

  static double() {
    return new MongoConnection(null as unknown as MongoClient);
  }
}
