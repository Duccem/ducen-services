import { FormatError } from '../../Errors/FormatError';
import { NumberValueObject } from '../primitives/NumberValueObject';

export class Longitude extends NumberValueObject {
  public validate(value: number): void {
    super.validation(value);
    if (value > 180 && value < -180) {
      throw new FormatError('Longitude out of boundaries');
    }
  }
}
