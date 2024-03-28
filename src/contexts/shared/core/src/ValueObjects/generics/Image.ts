import { StringValueObject } from '../primitives/StringValueObject';

export class Image extends StringValueObject {
  async toBase64(): Promise<string> {
    const buffer = Buffer.from(this.value, 'binary');
    const base64 = buffer.toString('base64');
    return base64;
  }
}
