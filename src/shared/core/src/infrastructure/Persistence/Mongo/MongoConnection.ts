import { WithTransactionCallback } from 'mongodb';
import { Connection, Schema } from 'mongoose';
import { InternalError } from '../../../domain/common/errors/InternalError';

export class MongoConnection {
  private connection: Connection;
  constructor(connection: Connection) {
    this.connection = connection;
  }
  getConnection(): Connection {
    return this.connection;
  }

  getCollection(collectionName: string, schema: Schema<any>) {
    return this.getConnection().model(collectionName, schema);
  }
  async transaction(modelName: string, schema: Schema<any>, fn: WithTransactionCallback<void>) {
    const session = await this.getCollection(modelName, schema).startSession();
    try {
      await session.withTransaction(fn);
    } catch (error) {
      console.log(error);
      throw new InternalError('Error with the source of true');
    } finally {
      await session.endSession();
    }
  }

  async close() {
    await this.connection.close();
  }
}
