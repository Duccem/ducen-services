import { Arranger } from '@ducen/core';
import { MongoClient } from 'mongodb';
import { MongoConnection } from '../../src/Persistence/Mongo/MongoConnection';

export class MongoArranger extends Arranger {
  constructor(private _client: MongoConnection) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  protected async cleanDatabase(): Promise<void> {
    const collections = await this.collections();
    const client = this.client();

    for (const collection of collections) {
      await client.db().collection(collection).deleteMany({});
    }
  }

  private async collections(): Promise<string[]> {
    const collections = await this.client().db().listCollections(undefined, { nameOnly: true }).toArray();

    return collections.map((collection) => collection.name);
  }

  protected client(): MongoClient {
    return this._client.client;
  }

  public async close(): Promise<void> {
    return this.client().close();
  }
}
