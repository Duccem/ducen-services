import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { StringValueObject } from '../primitives/StringValueObject';

export class Image extends StringValueObject {
  async toBase64(): Promise<string> {
    const buffer = Buffer.from(this.value, 'binary');
    const base64 = buffer.toString('base64');
    return base64;
  }

  async download(): Promise<void> {
    const fileName = this.value.split('/').pop();
    const response = await fetch(this.value);
    const stream = createWriteStream(fileName);
    await finished(Readable.fromWeb(response.body).pipe(stream));
  }
}
