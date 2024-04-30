import { Command, CommandHandler } from '@ducen-services/shared';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';
import { StoreService } from '../../domain/StoreService';
import { DocumentUploader } from './DocumentUploader';
import { UploadDocumentCommand } from './UploadDocumentCommand';

export class UploadDocumentCommandHandler implements CommandHandler<UploadDocumentCommand> {
  private uploader: DocumentUploader;
  constructor(repository: MedicalDocumentRepository, storage: StoreService) {
    this.uploader = new DocumentUploader(repository, storage);
  }

  subscribedTo(): Command {
    return UploadDocumentCommand;
  }

  public async handle(command: UploadDocumentCommand): Promise<void> {
    await this.uploader.run(command.metadata, command.buffer);
  }
}
