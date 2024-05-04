import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { StoreService, UploaderResponse } from '../../domain/StoreService';

export class S3StoreService implements StoreService {
  private client: S3Client;
  private bucket: string;
  constructor({
    access_key,
    region,
    secret_key,
    bucket,
  }: {
    region: string;
    access_key: string;
    secret_key: string;
    bucket: string;
  }) {
    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId: access_key,
        secretAccessKey: secret_key,
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
