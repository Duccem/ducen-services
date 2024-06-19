import { Command, Primitives } from '@ducen/shared';
import { Diagnostic } from '../../domain/Diagnostic';

export class CreateDiagnosticCommand extends Command {
  constructor(public readonly data: Primitives<Diagnostic>) {
    super();
  }
}
