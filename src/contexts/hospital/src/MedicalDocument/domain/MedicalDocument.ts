import { Aggregate, DateValueObject, Image, Primitives, Uuid } from '@ducen-services/shared';
import { MedicalDocumentDescription } from './MedicalDocumentDescription';
import { MedicalDocumentName } from './MedicalDocumentName';
import { MedicalDocumentType } from './MedicalDocumentType';

export class MedicalDocument extends Aggregate {
  constructor(
    id: Uuid,
    public type: MedicalDocumentType,
    public description: MedicalDocumentDescription,
    public fileName: MedicalDocumentName,
    public url: Image,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives() {
    return {
      id: this.id.toString(),
      type: this.type.value,
      description: this.description.value,
      fileName: this.fileName.value,
      url: this.url.value,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    };
  }
  static fromPrimitives(plain: Primitives<MedicalDocument>): MedicalDocument {
    return new MedicalDocument(
      new Uuid(plain.id),
      new MedicalDocumentType(plain.type),
      new MedicalDocumentDescription(plain.description),
      new MedicalDocumentName(plain.fileName),
      new Image(plain.url),
      new DateValueObject(plain.createdAt),
      new DateValueObject(plain.updatedAt),
    );
  }
}
