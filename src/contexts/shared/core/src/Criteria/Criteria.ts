import { Filters } from './Filter/Filters';
import { Order } from './Order/Order';
import { Paginator } from './Paginator/Paginator';

export type FilterType = { value: string; operator: string; field: string };

export class Criteria {
  readonly filters: Filters;
  readonly order?: Order;
  readonly paginator?: Paginator;

  constructor(filters: Filters, order?: Order, paginator?: Paginator) {
    this.filters = filters;
    this.order = order;
    this.paginator = paginator;
  }

  public hasFilter(): boolean {
    return this.filters.filters.length > 0;
  }

  public hasOrder(): boolean {
    return this.order ? true : false;
  }

  public hasPaginator(): boolean {
    return this.paginator ? true : false;
  }

  public getPaginator(count: number) {
    return {
      limit: this.paginator.limit.value,
      offset: this.paginator.offset.value,
      total: count,
    };
  }

  public static fromValues(
    filters: Array<FilterType>,
    orderBy?: string,
    order?: string,
    limit?: string,
    offset?: string
  ): Criteria {
    const query = {
      filters: Criteria.parseFilters(filters),
      orderBy: orderBy ? orderBy : undefined,
      order: order ? order : undefined,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    };
    return new Criteria(
      Filters.fromValues(query.filters),
      Order.fromValues(query.orderBy, query.order),
      Paginator.fromValues(query.limit, query.offset)
    );
  }

  public static parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
    if (!params) {
      return new Array<Map<string, string>>();
    }

    return params.map((filter) => {
      const field = filter.field;
      const value = filter.value;
      const operator = filter.operator;

      return new Map([
        ['field', field],
        ['operator', operator],
        ['value', value],
      ]);
    });
  }
}
