import { Command, Primitives } from '@ducen-services/shared';
import { Vaccine } from '../../domain/Vaccine';

export class CreateVaccineCommand extends Command {
  constructor(public data: Primitives<Vaccine>) {
    super();
  }
}
