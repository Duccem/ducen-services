import { Command, CommandHandler } from '@ducen-services/shared';
import { StoreService } from '../../../File/domain/StoreService';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
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
