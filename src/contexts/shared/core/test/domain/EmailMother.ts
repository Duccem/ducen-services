import { MotherCreator } from './MotherCreator';

export class EmailMother {
  static random({ provider }: { provider?: string }): string {
    return MotherCreator.random().internet.email({ provider });
  }
}
