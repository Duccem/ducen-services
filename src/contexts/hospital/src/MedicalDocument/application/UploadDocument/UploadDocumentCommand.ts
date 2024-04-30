import { Command, Primitives } from '@ducen-services/shared';
import { MedicalDocument } from '../../domain/MedicalDocument';

export class UploadDocumentCommand extends Command {
  constructor(
    public readonly buffer: Buffer,
    public readonly metadata: Primitives<MedicalDocument>,
  ) {
    super();
  }
}
