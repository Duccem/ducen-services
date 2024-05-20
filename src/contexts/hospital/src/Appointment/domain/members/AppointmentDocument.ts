import { File, StringValueObject } from '@ducen-services/shared';
import { AppointmentDocumentType } from './AppointmentDocumentType';

export class AppointmentDocument {
  constructor(
    public type: AppointmentDocumentType,
    public description: StringValueObject,
    public url: File,
  ) {}

  public toPrimitives() {
    return {
      type: this.type.value,
      description: this.description.value,
      url: this.url.value,
    };
  }

  static fromPrimitives(primitives: any): AppointmentDocument {
    return new AppointmentDocument(
      new AppointmentDocumentType(primitives.type),
      new StringValueObject(primitives.description),
      new File(primitives.url),
    );
  }

  static waitingForDocuments() {
    return [];
  }
}
