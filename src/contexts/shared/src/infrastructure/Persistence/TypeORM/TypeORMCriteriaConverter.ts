import { And, LessThan, Like, MoreThan, Not, Or } from 'typeorm';
import {
  Criteria,
  Filter,
  FilterType,
  Filters,
  Operator,
  Order,
  isFilter,
} from '../../../domain/core/Criteria';

interface TransformerFunction<T, K> {
  (value: T): K;
}
type Mappings = { [key: string]: string };

type TypeOrmOptions = {
  order?: { [key: string]: string };
  where?: { [key: string]: string };
  take?: number;
  skip?: number;
};
export class TypeORMCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, { [x: string]: any }>>;
  constructor() {
    this.filterTransformers = new Map<Operator, TransformerFunction<Filter, { [x: string]: any }>>([
      [Operator.EQUAL, this.equal],
      [Operator.NOT_EQUAL, this.notEqual],
      [Operator.GT, this.greaterThan],
      [Operator.LT, this.lowerThan],
      [Operator.CONTAINS, this.contains],
      [Operator.NOT_CONTAINS, this.notContains],
    ]);
  }

  public criteria(criteria: Criteria): TypeOrmOptions {
    if (!criteria)
      return {
        where: {},
        order: { id: 'ASC' },
        skip: 0,
        take: 50,
      };
    return {
      where: criteria.hasFilter() ? this.filter(criteria.getFilters()) : {},
      order: criteria.hasOrder() ? this.sort(criteria.getOrder()) : { id: 'ASC' },
      skip: criteria.hasPagination() ? criteria.getPagination().offset : 0,
      take: criteria.hasPagination() ? criteria.getPagination().limit : 50,
    };
  }

  private filter(filters: Filters) {
    const filter = filters.filters.map((filter) => {
      if (!isFilter(filter)) return this.filter(filter);
      const transformer = this.filterTransformers.get(filter.operator);

      if (!transformer) {
        throw Error(`Unexpected operator value ${filter.operator}`);
      }

      return transformer(filter);
    });
    if (filters.type === FilterType.AND) return And(Object.assign({}, ...filter));
    if (filters.type === FilterType.OR) return Or(Object.assign({}, ...filter));
    if (filters.type === FilterType.NOT) return Not(Object.assign({}, ...filter));
  }

  private sort(order: Order) {
    return {
      [order.field]: order.order,
    };
  }

  private equal(filter: Filter) {
    return { [filter.field]: filter.value };
  }
  private notEqual(filter: Filter) {
    return { [filter.field]: Not(filter.value) };
  }

  private greaterThan(filter: Filter) {
    return { [filter.field]: MoreThan(filter.value) };
  }

  private lowerThan(filter: Filter) {
    return { [filter.field]: LessThan(filter.value) };
  }

  private contains(filter: Filter) {
    return { [filter.field]: Like(`%${filter.value}%`) };
  }

  private notContains(filter: Filter) {
    return { [filter.field]: Not(Like(`%${filter.value}%`)) };
  }
}
