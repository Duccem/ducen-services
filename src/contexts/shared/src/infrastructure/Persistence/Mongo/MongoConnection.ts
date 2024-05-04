import { Db, MongoClient, WithTransactionCallback } from 'mongodb';
import { InternalError } from '../../../domain/Errors/InternalError';
import { Nullable } from '../../../domain/Types/Nullable';

export class MongoConnection {
  constructor(
    private connection: MongoClient,
    private dbName?: string,
  ) {}
  getConnection(): Nullable<Db> {
    return this.connection.db(this.dbName ? this.dbName : undefined);
  }

  getCollection(collectionName: string) {
    return this.getConnection().collection(collectionName);
  }

  get client(): MongoClient {
    return this.connection;
  }
  async transaction(fn: WithTransactionCallback<void>) {
    const session = this.connection.startSession();
    try {
      await session.withTransaction(fn);
    } catch (error) {
      console.log(error);
      throw new InternalError('Error with the source of true');
    } finally {
      await session.endSession();
    }
  }
}
