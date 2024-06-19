import { Command, Primitives } from '@ducen/shared';
import { Surgery } from '../../domain/Surgery';

export class CreateSurgeryCommand extends Command {
  constructor(public surgery: Primitives<Surgery>) {
    super();
  }
}
