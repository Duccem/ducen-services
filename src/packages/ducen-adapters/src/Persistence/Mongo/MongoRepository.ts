import { Aggregate, Criteria, Entity, InternalError, Logger, NewableClass, Primitives } from '@ducen/core';
import { Collection } from 'mongodb';
import { MongoConnection } from './MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';
export abstract class MongoRepository<T extends Aggregate | Entity> {
  protected converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(
    protected entity: NewableClass<T>,
    protected connection: MongoConnection,
    protected readonly logger: Logger,
  ) {}
  protected get collection(): Collection {
    return this.connection.getConnection()!.collection(this.model);
  }
  protected get model() {
    return this.entity.name.toLowerCase();
  }

  abstract index(): Promise<void>;

  protected async searchByCriteria(criteria: Criteria): Promise<Primitives<T>[]> {
    try {
      const { filter, limit, skip, sort } = this.converter.criteria(criteria);
      return await this.collection.find<Primitives<T>>(filter).sort(sort).skip(skip).limit(limit).toArray();
    } catch (error) {
      this.logger.error(`Error searching by criteria: ${error.message}`);
      throw new InternalError(`Error searching by criteria: ${error.message}`);
    }
  }

  protected async searchByText(text: string): Promise<Primitives<T>[]> {
    try {
      const filter = this.converter.search(text);
      return await this.collection.aggregate<Primitives<T>>(filter).toArray();
    } catch (error) {
      this.logger.error(`Error searching by text: ${error.message}`);
      throw new InternalError(`Error searching by text: ${error.message}`);
    }
  }

  protected async persist(id: string, aggregate: T): Promise<void> {
    try {
      await this.collection.updateOne({ id }, { $set: aggregate.toPrimitives() }, { upsert: true });
    } catch (error) {
      this.logger.error(`Error persisting aggregate: ${error.message}`);
      throw new InternalError(`Error persisting aggregate: ${error.message}`);
    }
  }
}
