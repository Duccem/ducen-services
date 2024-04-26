import { Filter } from './Filter';

export class Filters {
  readonly filters: Filter[];
  readonly embeds: Filters[] = [];
  constructor(filters: Filter[]) {
    this.filters = filters;
  }

  static fromValues(filters: Array<Map<string, string>>): Filters {
    return new Filters(filters.map(Filter.fromValues));
  }

  static none(): Filters {
    return new Filters([]);
  }

  embed(filters: Filters) {
    this.embeds.push(filters);
  }

  and(filters: Filter[]) {
    this.embeds.push(new AndFilters(filters));
  }

  or(filters: Filter[]) {
    this.embeds.push(new OrFilters(filters));
  }

  not(filters: Filter[]) {
    this.embeds.push(new NotFilters(filters));
  }
}

export class OrFilters extends Filters {}
export class AndFilters extends Filters {}
export class NotFilters extends Filters {}
