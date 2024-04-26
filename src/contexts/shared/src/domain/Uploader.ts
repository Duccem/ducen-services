export abstract class Uploader {
  public abstract upload(buffer: Buffer, name: string): Promise<UploaderResponse>;
}

export type UploaderResponse = {
  remote_id: string;
  url: string;
};
