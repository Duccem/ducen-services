import { Schema } from 'mongoose';
import { InternalError } from '../../../domain/common/errors/InternalError';
import { Aggregate } from '../../../domain/core/Aggregate';
import { Criteria } from '../../../domain/core/Criteria';
import { Entity } from '../../../domain/core/Entity';
import { Logger } from '../../../domain/core/Logger';
import { Constructor } from '../../../domain/types/Constructor';
import { Primitives } from '../../../domain/types/Primitives';
import { MongoConnection } from './MongoConnection';
import { MongoCriteriaConverter } from './MongoCriteriaConverter';

export abstract class MongoRepository<T extends Aggregate | Entity> {
  protected converter: MongoCriteriaConverter = new MongoCriteriaConverter();
  constructor(
    protected entity: Constructor<T>,
    protected connection: MongoConnection,
    protected readonly logger: Logger,
  ) {}

  protected get collection() {
    return this.connection.getCollection(this.model, this.schema);
  }

  protected get model() {
    return this.entity.name;
  }

  abstract get schema(): Schema<any>;

  protected async searchByCriteria(criteria: Criteria): Promise<Primitives<T>[]> {
    try {
      const { filter, limit, skip, sort } = this.converter.criteria(criteria);
      const documents = await this.collection
        .find<Primitives<T>>(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec();
      return documents;
    } catch (error) {
      this.handleError(`Error searching by criteria ${this.model}: ${error.message}`);
    }
  }

  protected async getOneByCriteria(criteria: Criteria): Promise<Primitives<T>> {
    try {
      const { filter } = this.converter.criteria(criteria);
      return await this.collection.findOne<Primitives<T>>(filter);
    } catch (error) {
      this.handleError(`Error getting one by criteria ${this.model}: ${error.message}`);
    }
  }

  protected async searchByText(text: string): Promise<Primitives<T>[]> {
    try {
      return await this.collection
        .aggregate<
          Primitives<T>
        >([{ $match: { $text: { $search: text } } }, { $limit: 50 }, { $addFields: { score: { $meta: 'textScore' } } }, { $sort: { score: { $meta: 'textScore' } } }])
        .exec();
    } catch (error) {
      this.handleError(`Error searching by text ${this.model}: ${error.message}`);
    }
  }
  w;

  protected async persist(id: string, aggregate: T): Promise<void> {
    try {
      await this.collection.updateOne({ id }, { $set: { ...aggregate.toPrimitives() } }, { upsert: true });
    } catch (error) {
      this.handleError(`Error persisting ${this.model}: ${error.message}`);
    }
  }

  protected handleError(message: string) {
    this.logger.error(message);
    throw new InternalError(message);
  }
}
