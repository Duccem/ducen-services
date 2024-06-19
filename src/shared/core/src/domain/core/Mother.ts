import { Faker, faker } from '@faker-js/faker';

export abstract class Mother {
  static random(): Faker {
    return faker;
  }

  abstract generate(...args: any[]): any;
}
