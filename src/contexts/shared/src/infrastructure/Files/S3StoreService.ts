import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { StoreService, UploaderResponse } from '../../domain/StoreService';

export class S3StoreService implements StoreService {
  private client: S3Client;
  private bucket: string;
  constructor({
    accessKeyId,
    region,
    secretAccessKey,
    bucket,
  }: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
  }) {
    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.bucket = bucket;
  }
  async upload(buffer: Buffer, name: string): Promise<UploaderResponse> {
    const stream = Readable.from(buffer);
    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: name,
      Body: stream,
    });
    await this.client.send(command);
    return {
      remote_id: name,
      url: `https://${this.bucket}.s3.amazonaws.com/${name}`,
    };
  }
}
