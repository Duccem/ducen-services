import { Aggregate } from '../Aggregate';
import { Response } from '../Response';

export type Pagination = {
  limit: number;
  offset: number;
  total: number;
};

export class PaginatedResponse extends Response {
  readonly data: Array<Aggregate>;
  readonly pagination: Pagination;
  constructor(message: string, data: Array<Aggregate>, pagination: Pagination) {
    super(message, 200);
    this.data = data;
    this.pagination = pagination;
  }

  public formatResponse() {
    return {
      code: this.code,
      message: this.message,
      data: Aggregate.toArray(this.data),
      pagination: this.pagination,
    };
  }
}
