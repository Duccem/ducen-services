import { Aggregate, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen-services/shared';
import { DiagnosticCode } from './DiagnosticCode';
import { DiagnosticStatus, DiagnosticStatuses } from './DiagnosticStatus';
import { DiagnosticType, DiagnosticTypes } from './DiagnosticType';

export class Diagnostic extends Aggregate {
  constructor(
    id: Uuid,
    public patientId: Uuid,
    public doctorId: Uuid,
    public appointmentId: Uuid,
    public description: StringValueObject,
    public code: DiagnosticCode,
    public status: DiagnosticStatus,
    public type: DiagnosticType,
    createdAt: DateValueObject,
    updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives(): Primitives<Diagnostic> {
    return {
      id: this.id.toString(),
      patientId: this.patientId.toString(),
      doctorId: this.doctorId.toString(),
      appointmentId: this.appointmentId.toString(),
      description: this.description.toString(),
      code: this.code.toString(),
      status: this.status.getValue(),
      type: this.type.getValue(),
      createdAt: this.createdAt.getValue(),
      updatedAt: this.updatedAt.getValue(),
    };
  }

  static fromPrimitives(data: Primitives<Diagnostic>): Diagnostic {
    return new Diagnostic(
      new Uuid(data.id),
      new Uuid(data.patientId),
      new Uuid(data.doctorId),
      new Uuid(data.appointmentId),
      new StringValueObject(data.description),
      new DiagnosticCode(data.code),
      new DiagnosticStatus(data.status),
      new DiagnosticType(data.type),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  static Create(
    id: string,
    patientId: string,
    doctorId: string,
    appointmentId: string,
    description: string,
    code: string,
    status: string,
    type: string,
  ): Diagnostic {
    return new Diagnostic(
      new Uuid(id),
      new Uuid(patientId),
      new Uuid(doctorId),
      new Uuid(appointmentId),
      new StringValueObject(description),
      new DiagnosticCode(code),
      new DiagnosticStatus(status as DiagnosticStatuses),
      new DiagnosticType(type as DiagnosticTypes),
      DateValueObject.today(),
      DateValueObject.today(),
    );
  }
}
