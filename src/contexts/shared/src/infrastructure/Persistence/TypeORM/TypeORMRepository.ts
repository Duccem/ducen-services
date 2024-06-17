import { EntitySchema } from 'typeorm';
import { InternalError } from '../../../domain/common/errors/InternalError';
import { Aggregate } from '../../../domain/core/Aggregate';
import { Entity } from '../../../domain/core/Entity';
import { Logger } from '../../../domain/core/Logger';
import { Constructor } from '../../../domain/types/Constructor';
import { Primitives } from '../../../domain/types/Primitives';
import { TypeORMConnection } from './TypeORMConnection';

export abstract class TypeORMRepository<T extends Aggregate | Entity> {
  constructor(
    protected entity: Constructor<T>,
    protected connection: TypeORMConnection,
    protected readonly logger: Logger,
  ) {}

  abstract get schema(): EntitySchema<T>;
  protected get model() {
    return this.entity.name;
  }

  protected get repository() {
    return this.connection.getRepository(this.schema);
  }

  protected handleError(message: string) {
    this.logger.error(message);
    throw new InternalError(message);
  }

  protected async searchByCriteria(criteria: any): Promise<Primitives<T>[]> {
    try {
      const response = await this.repository.find();
      return response as Primitives<T>[];
    } catch (error) {
      this.handleError(`Error searching by criteria ${this.model}: ${error.message}`);
    }
  }

  protected async getOneByCriteria(criteria: any): Promise<Primitives<T>> {
    try {
      const response = await this.repository.findOne({});
      return response as Primitives<T>;
    } catch (error) {
      this.handleError(`Error getting one by criteria ${this.model}: ${error.message}`);
    }
  }

  protected async searchByText(text: string): Promise<Primitives<T>[]> {
    try {
      const builder = this.repository.createQueryBuilder();
      builder.where('MATCH (id) AGAINST (:text IN NATURAL LANGUAGE MODE)', { text });
      const response = await this.repository.find();
      return response as Primitives<T>[];
    } catch (error) {
      this.handleError(`Error searching by text ${this.model}: ${error.message}`);
    }
  }

  protected async persist(aggregate: T): Promise<void> {
    try {
      await this.repository.upsert(aggregate.toPrimitives(), {
        conflictPaths: ['id'],
        skipUpdateIfNoValuesChanged: true,
      });
    } catch (error) {
      this.handleError(`Error persisting ${this.model}: ${error.message}`);
    }
  }
}
