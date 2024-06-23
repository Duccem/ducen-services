import { ClientSession, Connection, Schema } from 'mongoose';
import { InternalError } from '../../../domain/implementations/errors/InternalError';

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
  async transaction(fn: (session: ClientSession) => Promise<void>) {
    const session = await this.getConnection().startSession();
    try {
      await session.withTransaction(fn);
    } catch (error) {
      throw new InternalError('Error executing transaction');
    } finally {
      await session.endSession();
    }
  }

  async close() {
    await this.connection.close();
  }
}
