import { Enum } from '../../ValueObjects/generics/Enum';

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

export class OrderType extends Enum<OrderTypes> {
  constructor(value: OrderTypes) {
    super(value, Object.values(OrderTypes));
  }

  static fromValue(value: string): OrderType {
    switch (value) {
      case OrderTypes.ASC:
        return new OrderType(OrderTypes.ASC);
      case OrderTypes.DESC:
        return new OrderType(OrderTypes.DESC);
      default:
        throw new Error(`The order type ${value} is invalid`);
    }
  }

  public isNone(): boolean {
    return this.value === OrderTypes.NONE;
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC;
  }

  public toString(): string {
    return this.value;
  }
}
