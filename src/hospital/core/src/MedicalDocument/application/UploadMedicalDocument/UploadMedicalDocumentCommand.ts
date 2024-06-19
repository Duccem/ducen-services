import { Command, Primitives } from '@ducen/shared';
import { MedicalDocument } from '../../domain/MedicalDocument';

export class UploadMedicalDocumentCommand extends Command {
  constructor(public readonly buffer: Buffer, public readonly metadata: Primitives<MedicalDocument>) {
    super();
  }
}
