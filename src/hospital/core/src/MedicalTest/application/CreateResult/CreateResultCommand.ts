import { Command, Primitives } from '@ducen/shared';
import { MedicalTest } from '../../domain/MedicalTest';

export class CreateResultCommand extends Command {
  constructor(public result: Primitives<MedicalTest>) {
    super();
  }
}
