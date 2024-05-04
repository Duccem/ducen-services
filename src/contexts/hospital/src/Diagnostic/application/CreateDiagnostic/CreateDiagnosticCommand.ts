import { Command, Primitives } from '@ducen-services/shared';
import { Diagnostic } from '../../domain/Diagnostic';

export class CreateDiagnosticCommand extends Command {
  constructor(public readonly data: Primitives<Diagnostic>) {
    super();
  }
}
