import { Command, Primitives } from '@ducen/shared';
import { Flag } from '../../domain/Flag';

export class CreateFlagCommand extends Command {
  constructor(public flag: Primitives<Flag>) {
    super();
  }
}
