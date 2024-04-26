import { Command, Primitives } from '@ducen-services/shared';
import { Flag } from '../../domain/Flag';

export class CreateFlagCommand extends Command {
  constructor(public flag: Primitives<Flag>) {
    super();
  }
}
