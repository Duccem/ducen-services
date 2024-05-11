import { StoreService, UploaderResponse } from '../../domain/StoreService';

export class FileUploader {
  constructor(private readonly storeService: StoreService) {}

  async run(buffer: Buffer, fileName: string): Promise<UploaderResponse> {
    return await this.storeService.upload(buffer, fileName);
  }
}
