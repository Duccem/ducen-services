import { Aggregate, DateValueObject, Primitives, Uuid } from '@ducen-services/shared';
import { File } from '../../File/domain/File';
import { MedicalDocumentDescription } from './MedicalDocumentDescription';
import { MedicalDocumentName } from './MedicalDocumentName';
import { MedicalDocumentType } from './MedicalDocumentType';

export class MedicalDocument extends Aggregate {
  constructor(
    id: Uuid,
    public userId: Uuid,
    public type: MedicalDocumentType,
    public description: MedicalDocumentDescription,
    public fileName: MedicalDocumentName,
    public url: File,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<MedicalDocument> {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      type: this.type.value,
      description: this.description.value,
      fileName: this.fileName.value,
      url: this.url.value,
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }
  static fromPrimitives(plain: Primitives<MedicalDocument>): MedicalDocument {
    return new MedicalDocument(
      new Uuid(plain.id),
      new Uuid(plain.userId),
      new MedicalDocumentType(plain.type),
      new MedicalDocumentDescription(plain.description),
      new MedicalDocumentName(plain.fileName),
      new File(plain.url),
      new DateValueObject(plain.createdAt),
      new DateValueObject(plain.updatedAt),
    );
  }
}
