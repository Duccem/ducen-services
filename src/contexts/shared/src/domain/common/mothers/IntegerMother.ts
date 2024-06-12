import { Mother } from '../../core/Mother';

export class IntegerMother extends Mother {
  generate(max?: number): number {
    return Mother.random().number.int({ max });
  }
}
