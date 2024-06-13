import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen-services/shared';
import { Medication } from './Medication';
import { TreatmentDuration } from './TreatmentDuration';
import { TreatmentStatus, TreatmentStatuses } from './TreatmentStatus';
import { TreatmentType, TreatmentTypes } from './TreatmentType';

export class Treatment extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public doctorId: Uuid,
    public diagnosticId: Uuid,
    public appointmentId: Uuid,
    public type: TreatmentType,
    public description: StringValueObject,
    public instructions: StringValueObject,
    public status: TreatmentStatus,
    public duration: TreatmentDuration,
    public medicaments: Medication[],
    public startDate: DateValueObject,
    public endDate: DateValueObject,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<Treatment> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      doctorId: this.doctorId.toString(),
      diagnosticId: this.diagnosticId.toString(),
      appointmentId: this.appointmentId.toString(),
      type: this.type.getValue(),
      description: this.description.toString(),
      instructions: this.instructions.toString(),
      status: this.status.getValue(),
      duration: this.duration.toPrimitives(),
      medicaments: this.medicaments.map((medicament) => medicament.toPrimitives()),
      startDate: this.startDate.getValue(),
      endDate: this.endDate.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  public static fromPrimitives(primitive: Primitives<Treatment>): Treatment {
    return new Treatment(
      new Uuid(primitive.id),
      new Uuid(primitive.patientId),
      new Uuid(primitive.doctorId),
      new Uuid(primitive.diagnosticId),
      new Uuid(primitive.appointmentId),
      new TreatmentType(primitive.type),
      new StringValueObject(primitive.description),
      new StringValueObject(primitive.instructions),
      new TreatmentStatus(primitive.status),
      TreatmentDuration.fromPrimitives(primitive.duration),
      primitive.medicaments.map((medicament) => Medication.fromPrimitive(medicament)),
      new DateValueObject(primitive.startDate),
      new DateValueObject(primitive.endDate),
      new DateValueObject(primitive.createdAt),
      new DateValueObject(primitive.updatedAt),
    );
  }

  public static Create(
    id: string,
    patientId: string,
    doctorId: string,
    diagnosticId: string,
    appointmentId: string,
    type: TreatmentTypes,
    description: string,
    instructions: string,
    status: TreatmentStatuses,
    medicaments: Primitives<Medication>[],
    startDate: Date,
    endDate: Date,
  ): Treatment {
    return new Treatment(
      new Uuid(id),
      new Uuid(patientId),
      new Uuid(doctorId),
      new Uuid(diagnosticId),
      new Uuid(appointmentId),
      new TreatmentType(type),
      new StringValueObject(description),
      new StringValueObject(instructions),
      new TreatmentStatus(status),
      TreatmentDuration.fromDates(startDate, endDate),
      medicaments.map((medicament) => Medication.fromPrimitive(medicament)),
      new DateValueObject(startDate),
      new DateValueObject(endDate),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }
}
