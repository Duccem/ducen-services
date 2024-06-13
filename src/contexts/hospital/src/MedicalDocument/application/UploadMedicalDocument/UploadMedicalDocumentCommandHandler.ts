import { Command, CommandHandler } from '@ducen-services/shared';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
import { StoreService } from '../../domain/StoreService';
import { DocumentUploader } from './MedicalDocumentUploader';
import { UploadMedicalDocumentCommand } from './UploadMedicalDocumentCommand';

export class UploadMedicalDocumentCommandHandler implements CommandHandler<UploadMedicalDocumentCommand> {
  private uploader: DocumentUploader;
  constructor(repository: MedicalDocumentRepository, storage: StoreService) {
    this.uploader = new DocumentUploader(repository, storage);
  }

  subscribedTo(): Command {
    return UploadMedicalDocumentCommand;
  }

  public async handle(command: UploadMedicalDocumentCommand): Promise<void> {
    await this.uploader.run(command.metadata, command.buffer);
  }
}
