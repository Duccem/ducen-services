import { Arranger } from '../../../domain/Arranger';
import { MongoConnection } from './MongoConnection';

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
      await client.db.collection(collection).deleteMany({});
    }
  }

  private async collections(): Promise<string[]> {
    const collections = await this.client().db.listCollections(undefined, { nameOnly: true }).toArray();

    return collections.map((collection) => collection.name);
  }

  protected client() {
    return this._client.getConnection();
  }

  public async close(): Promise<void> {
    return this.client().close();
  }
}
