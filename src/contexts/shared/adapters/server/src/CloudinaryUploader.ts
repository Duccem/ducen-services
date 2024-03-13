import { Uploader, UploaderResponse } from '@shared/core';
import { UploadApiResponse, v2 } from 'cloudinary';
import { Readable } from 'stream';

export class CloudinaryUploader implements Uploader {
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
