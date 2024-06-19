import { createConnection } from 'mongoose';
import { MongoConnection } from './MongoConnection';

export class MongoConnectionFactory {
  static async create(host: string) {
    const client = await createConnection(host).asPromise();
    return new MongoConnection(client);
  }
}
