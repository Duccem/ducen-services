import { StringValueObject } from '../primitives/StringValueObject';

export class Image extends StringValueObject {
  async toBase64(data: any): Promise<string> {
    const buffer = Buffer.from(data, 'binary');
    const base64 = buffer.toString('base64');
    return base64;
  }
}
