import { Join } from './Join';

export class Joins {
  readonly joins: Join[];
  constructor(joins: Join[]) {
    this.joins = joins;
  }

  static fromValues(joins: Array<Map<string, string>>): Joins {
    return new Joins(joins.map(Join.fromValues));
  }
}
