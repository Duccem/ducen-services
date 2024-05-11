import { Primitives } from '@ducen-services/shared';
import { FileUploader } from '../../../File/application/UploadFile/FileUploader';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';

export class DocumentUploader {
  constructor(
    public readonly repository: MedicalDocumentRepository,
    public readonly fileUploader: FileUploader,
  ) {}

  async run(metadata: Primitives<MedicalDocument>, buffer: Buffer): Promise<void> {
    const fileName = `${metadata.userId}/${metadata.type}/${metadata.fileName}`;
    const { url } = await this.fileUploader.run(buffer, fileName);
    const document = MedicalDocument.fromPrimitives({ ...metadata, url });
    await this.repository.save(document);
  }
}
