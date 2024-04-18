import {
  AndFilters,
  Criteria,
  Filter,
  Filters,
  Join,
  Joins,
  NotFilters,
  Operator,
  OrFilters,
  Order,
  Projection,
  Relationships,
} from '@ducen/core';

interface TransformerFunction<T, K> {
  (value: T): K;
}

type MongoFilterOperator = '$eq' | '$ne' | '$gt' | '$lt' | '$regex' | '$in' | '$nin';
type MongoFilterValue = boolean | string | number | any;
type MongoFilterOperation = { [operator in MongoFilterOperator]?: MongoFilterValue };
export type MongoFilter =
  | { [field: string]: MongoFilterOperation }
  | { [field: string]: { $not: MongoFilterOperation } | MongoFilter[] };
export type MongoDirection = 1 | -1;
export type MongoSort = { [field: string]: MongoDirection };

interface MongoQuery {
  filter: MongoFilter;
  sort: MongoSort;
  skip: number;
  limit: number;
}

export class MongoCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, MongoFilter>>;

  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, MongoFilter>>([
      [Operator.EQUAL, this.equal],
      [Operator.NOT_EQUAL, this.notEqual],
      [Operator.GT, this.greaterThan],
      [Operator.LT, this.lowerThan],
      [Operator.CONTAINS, this.contains],
      [Operator.NOT_CONTAINS, this.notContains],
    ]);
  }

  public convert(criteria?: Criteria, joins?: Joins, projection?: Projection) {
    const { filter, limit, skip, sort } = this.criteria(criteria);
    const join = this.join(joins);
    const project = this.project(projection);
    return [
      { $match: filter },
      ...join,
      { $sort: sort },
      { $skip: skip },
      { $limit: limit },
      project ? { $project: project } : {},
    ];
  }

  public criteria(criteria: Criteria): MongoQuery {
    if (!criteria)
      return {
        filter: {},
        sort: { _id: -1 },
        skip: 0,
        limit: 50,
      };
    return {
      filter: criteria.hasFilter() ? this.filter(criteria.filters) : {},
      sort: criteria.hasOrder() ? this.sort(criteria.order) : { _id: -1 },
      skip: criteria.hasPaginator() ? criteria.paginator.offset.getValue() : 0,
      limit: criteria.hasPaginator() ? criteria.paginator.limit.getValue() : 50,
    };
  }

  public join(joins?: Joins) {
    if (!joins) return [];
    const lookups = joins.joins.map((join) => this.lookup(join));
    const unwinds = joins.joins.map((join) => this.unwind(join));
    return [...lookups, ...unwinds];
  }

  public project(projection: Projection) {
    if (projection.isEmpty()) return null;
    return projection.fields.reduce((acc, field) => ({ ...acc, [field.value]: 1 }), {});
  }

  public search(text: string) {
    return [
      { $match: { $text: { $search: text } } },
      { $addFields: { score: { $meta: 'textScore' } } },
      { $sort: { score: { $meta: 'textScore' } } },
    ];
  }

  private filter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      const transformer = this.filterTransformers.get(filter.operator.value);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator.value}`);
      }

      return transformer(filter);
    });
    //const embeddings = filters.embeds.reduce((acc, filters) => ({ ...acc, ...this.filter(filters) }), {});
    if (filters instanceof AndFilters) return { $and: [...filter] };
    if (filters instanceof OrFilters) return { $or: [...filter] };
    if (filters instanceof NotFilters) return { $not: Object.assign({}, ...filter) };
    return Object.assign({}, ...filter);
  }

  private sort(order: Order): MongoSort {
    return {
      [order.orderBy.value === 'id' ? '_id' : order.orderBy.value]: order.orderType.isAsc() ? 1 : -1,
    };
  }

  private lookup(join: Join) {
    const relationship = join.relationship.value;
    return {
      $lookup: {
        from: join.right.value,
        localField: relationship === Relationships.MANY_TO_ONE ? join.left.value : '_id',
        foreignField: relationship === Relationships.MANY_TO_ONE ? '_id' : join.right.value,
        as: join.right.value,
      },
    };
  }

  private unwind(join: Join) {
    if (join.relationship.value !== Relationships.MANY_TO_ONE) return;
    return {
      $unwind: {
        path: `$${join.right.value}`,
        includeArrayIndex: 'string',
        preserveNullAndEmptyArrays: true,
      },
    };
  }

  private equal(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $eq: filter.value.value } };
  }

  private notEqual(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $ne: filter.value.value } };
  }

  private greaterThan(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $gt: filter.value.value } };
  }

  private lowerThan(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $lt: filter.value.value } };
  }

  private contains(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $regex: filter.value.value } };
  }

  private notContains(filter: Filter): MongoFilter {
    return { [filter.field.value]: { $not: { $regex: filter.value.value } } };
  }
}
