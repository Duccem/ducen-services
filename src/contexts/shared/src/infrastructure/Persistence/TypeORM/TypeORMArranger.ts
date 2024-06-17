import { Arranger } from '../../../domain/core/Arranger';
import { TypeORMConnection } from './TypeORMConnection';

export class MongoArranger extends Arranger {
  constructor(private _client: TypeORMConnection) {
    super();
  }

  public async arrange(): Promise<void> {
    await this.cleanDatabase();
  }

  protected async cleanDatabase(): Promise<void> {
    const collections = await this.collections();
    const client = this.client();

    for (const collection of collections) {
      await client.getRepository(collection).query(`TRUNCATE TABLE ${collection};`);
    }
  }

  private async collections(): Promise<string[]> {
    const collections = this.client().entityMetadatas;

    return collections.map((collection) => collection.name);
  }

  protected client() {
    return this._client.getConnection();
  }

  public async close(): Promise<void> {
    return this.client().close();
  }
}
