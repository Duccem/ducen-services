import { Command, Primitives } from '@ducen-services/shared';
import { Surgery } from '../../domain/Surgery';

export class CreateSurgeryCommand extends Command {
  constructor(public surgery: Primitives<Surgery>) {
    super();
  }
}
