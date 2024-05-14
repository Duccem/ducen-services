import { Primitives, StoreService } from '@ducen-services/shared';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';

export class DocumentUploader {
  constructor(
    public readonly repository: MedicalDocumentRepository,
    private readonly storeService: StoreService,
  ) {}

  async run(metadata: Primitives<MedicalDocument>, image: Buffer): Promise<void> {
    const fileName = `${metadata.userId}/${metadata.type}/${metadata.fileName}`;
    const { url } = await this.storeService.upload(image, fileName);
    const document = MedicalDocument.fromPrimitives({ ...metadata, url });
    await this.repository.save(document);
  }
}
