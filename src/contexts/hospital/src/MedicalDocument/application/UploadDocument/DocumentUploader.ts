import { Primitives } from '@ducen-services/shared';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
import { StoreService } from '../../domain/StoreService';

export class DocumentUploader {
  constructor(
    public readonly repository: MedicalDocumentRepository,
    public readonly storeService: StoreService,
  ) {}

  async run(metadata: Primitives<MedicalDocument>, buffer: Buffer): Promise<void> {
    const fileName = `${metadata.userId}/${metadata.type}/${metadata.fileName}`;
    const { url } = await this.storeService.upload(buffer, fileName);
    const document = MedicalDocument.fromPrimitives({ ...metadata, url });
    await this.repository.save(document);
  }
}
