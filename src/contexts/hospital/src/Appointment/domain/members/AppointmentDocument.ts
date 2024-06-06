import { File, StringValueObject } from '@ducen-services/shared';
import { AppointmentDocumentType } from './AppointmentDocumentType';

export class AppointmentDocument {
  constructor(
    public type: AppointmentDocumentType,
    public name: StringValueObject,
    public url: File,
  ) {}

  public toPrimitives() {
    return {
      type: this.type.value,
      name: this.name.value,
      url: this.url.value,
    };
  }

  static fromPrimitives(primitives: any): AppointmentDocument {
    return new AppointmentDocument(
      new AppointmentDocumentType(primitives.type),
      new StringValueObject(primitives.name),
      new File(primitives.url),
    );
  }

  static waitingForDocuments() {
    return [];
  }
}
