import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';
import { StoreService, UploaderResponse } from '../../domain/StoreService';

export class CloudinaryStoreService implements StoreService {
  constructor({ cloudName, apiKey, apiSecret }: { cloudName: string; apiKey: string; apiSecret: string }) {
    v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
  }
  async upload(buffer: Buffer, name: string): Promise<UploaderResponse> {
    const { public_id, secure_url: url } = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = v2.uploader.upload_stream(
        {
          folder: 'uploads',
          filename_override: name,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          return resolve(result);
        },
      );
      Readable.from(buffer).pipe(stream);
    });
    return { remote_id: public_id, url };
  }
}
