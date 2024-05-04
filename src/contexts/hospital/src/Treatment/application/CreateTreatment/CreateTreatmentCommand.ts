import { Command, Primitives } from '@ducen-services/shared';
import { Treatment } from '../../domain/Treatment';

export class CreateTreatmentCommand extends Command {
  constructor(public readonly data: Primitives<Treatment>) {
    super();
  }
}
