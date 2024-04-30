import { Aggregate, DateValueObject, Primitives, Uuid } from '@ducen-services/shared';
import { LabResultLaboratory } from './LabResultLaboratory';
import { LabResultType, LabResultTypes } from './LabResultType';
import { Attribute } from './Result';

export class LabResult extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public type: LabResultType,
    public laboratory: LabResultLaboratory,
    public date: DateValueObject,
    public attributes: Attribute[],
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<LabResult> {
    return {
      id: this.id.value,
      patientId: this.patientId.value,
      type: this.type.value,
      laboratory: this.laboratory.value,
      date: this.date.value,
      attributes: this.attributes.map((attribute) => attribute.toPrimitives()),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(primitives: Primitives<LabResult>): LabResult {
    return new LabResult(
      new Uuid(primitives.id),
      new Uuid(primitives.patientId),
      new LabResultType(primitives.type),
      new LabResultLaboratory(primitives.laboratory),
      new DateValueObject(primitives.date),
      primitives.attributes.map((attribute: Primitives<Attribute>) => Attribute.fromPrimitives(attribute)),
      new DateValueObject(primitives.createdAt),
      new DateValueObject(primitives.updatedAt),
    );
  }

  static Create(
    id: string,
    patientId: string,
    type: string,
    laboratory: string,
    date: Date,
    attributes: {
      category: string;
      name: string;
      metric: string;
      unit: string;
      referenceRange: string;
    }[],
  ): LabResult {
    return new LabResult(
      new Uuid(id),
      new Uuid(patientId),
      new LabResultType(type as LabResultTypes),
      new LabResultLaboratory(laboratory),
      new DateValueObject(date),
      attributes.map(Attribute.fromPrimitives),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }
}
