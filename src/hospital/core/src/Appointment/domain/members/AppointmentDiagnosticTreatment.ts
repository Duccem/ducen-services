import { DateValueObject, Primitives, StringValueObject } from '@ducen/shared';
import { AppointmentDiagnosticTreatmentMedication } from './AppointmentDiagnosticTreatmentMedication';
import { AppointmentDiagnosticTreatmentType } from './AppointmentDiagnosticTreatmentType';

export class AppointmentDiagnosticTreatment {
  constructor(
    public type: AppointmentDiagnosticTreatmentType,
    public description: StringValueObject,
    public instructions: StringValueObject,
    public initDate: DateValueObject,
    public endDate: DateValueObject,
    public medications: AppointmentDiagnosticTreatmentMedication[]
  ) {}

  toPrimitives(): Primitives<AppointmentDiagnosticTreatment> {
    return {
      type: this.type.getValue(),
      description: this.description.toString(),
      instructions: this.instructions.toString(),
      initDate: this.initDate.getValue(),
      endDate: this.endDate.getValue(),
      medications: this.medications.map((medication) => medication.toPrimitives()),
    };
  }

  static fromPrimitives(
    primitive: Primitives<AppointmentDiagnosticTreatment>
  ): AppointmentDiagnosticTreatment {
    return new AppointmentDiagnosticTreatment(
      new AppointmentDiagnosticTreatmentType(primitive.type),
      new StringValueObject(primitive.description),
      new StringValueObject(primitive.instructions),
      new DateValueObject(primitive.initDate),
      new DateValueObject(primitive.endDate),
      primitive.medications.map((medication) =>
        AppointmentDiagnosticTreatmentMedication.fromPrimitives(medication)
      )
    );
  }

  static waitingForTreatment(): AppointmentDiagnosticTreatment {
    return new AppointmentDiagnosticTreatment(
      AppointmentDiagnosticTreatmentType.noTreatment(),
      new StringValueObject(''),
      new StringValueObject(''),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
      []
    );
  }
}
