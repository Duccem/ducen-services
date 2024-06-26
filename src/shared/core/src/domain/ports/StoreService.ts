export interface StoreService {
  upload(buffer: Buffer, name: string): Promise<UploaderResponse>;
}
export type UploaderResponse = {
  remote_id: string;
  url: string;
};
