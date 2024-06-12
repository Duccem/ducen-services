import { Mother } from '../../core/Mother';

export class UuidMother extends Mother {
  generate(): string {
    return Mother.random().string.uuid();
  }

  hash(): string {
    return Mother.random().string.alphanumeric(50);
  }
}
