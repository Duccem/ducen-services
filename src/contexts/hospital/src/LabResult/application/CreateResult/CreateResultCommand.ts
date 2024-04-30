import { Command, Primitives } from '@ducen-services/shared';
import { LabResult } from '../../domain/LabResult';

export class CreateResultCommand extends Command {
  constructor(public result: Primitives<LabResult>) {
    super();
  }
}
