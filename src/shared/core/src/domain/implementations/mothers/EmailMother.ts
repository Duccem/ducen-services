import { Mother } from '../../core/Mother';

export class EmailMother extends Mother {
  generate(provider?: string): string {
    return Mother.random().internet.email({ provider: provider || 'gmail.com' });
  }
}
