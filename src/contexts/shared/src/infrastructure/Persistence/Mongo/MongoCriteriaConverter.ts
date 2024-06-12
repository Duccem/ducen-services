import {
  Criteria,
  Filter,
  FilterType,
  Filters,
  Operator,
  Order,
  isAsc,
  isFilter,
} from '../../../domain/core/Criteria';

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

  public criteria(criteria: Criteria): MongoQuery {
    if (!criteria)
      return {
        filter: {},
        sort: { _id: -1 },
        skip: 0,
        limit: 50,
      };
    return {
      filter: criteria.hasFilter() ? this.filter(criteria.getFilters()) : {},
      sort: criteria.hasOrder() ? this.sort(criteria.getOrder()) : { _id: -1 },
      skip: criteria.hasPagination() ? criteria.getPagination().offset : 0,
      limit: criteria.hasPagination() ? criteria.getPagination().limit : 50,
    };
  }

  private filter(filters: Filters): MongoFilter {
    const filter = filters.filters.map((filter) => {
      if (!isFilter(filter)) return this.filter(filter);
      const transformer = this.filterTransformers.get(filter.operator);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator}`);
      }

      return transformer(filter);
    });
    if (filters.type === FilterType.AND) return { $and: [...filter] };
    if (filters.type === FilterType.OR) return { $or: [...filter] };
    if (filters.type === FilterType.NOT) return { $not: Object.assign({}, ...filter) };
    return Object.assign({}, ...filter);
  }

  private sort(order: Order): MongoSort {
    return {
      [order.field === 'id' ? '_id' : order.field]: isAsc(order.order) ? 1 : -1,
    };
  }

  private equal(filter: Filter): MongoFilter {
    return { [filter.field]: { $eq: filter.value } };
  }

  private notEqual(filter: Filter): MongoFilter {
    return { [filter.field]: { $ne: filter.value } };
  }

  private greaterThan(filter: Filter): MongoFilter {
    return { [filter.field]: { $gt: filter.value } };
  }

  private lowerThan(filter: Filter): MongoFilter {
    return { [filter.field]: { $lt: filter.value } };
  }

  private contains(filter: Filter): MongoFilter {
    return { [filter.field]: { $regex: filter.value } };
  }

  private notContains(filter: Filter): MongoFilter {
    return { [filter.field]: { $not: { $regex: filter.value } } };
  }
}
