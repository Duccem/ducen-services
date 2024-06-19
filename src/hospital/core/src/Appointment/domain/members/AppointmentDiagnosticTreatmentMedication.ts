import { Primitives, StringValueObject } from '@ducen/shared';

export class AppointmentDiagnosticTreatmentMedication {
  constructor(
    public name: StringValueObject,
    public dose: StringValueObject,
    public frequency: StringValueObject
  ) {}

  public toPrimitives(): Primitives<AppointmentDiagnosticTreatmentMedication> {
    return {
      name: this.name.toString(),
      dose: this.dose.toString(),
      frequency: this.frequency.toString(),
    };
  }

  public static fromPrimitives(
    primitive: Primitives<AppointmentDiagnosticTreatmentMedication>
  ): AppointmentDiagnosticTreatmentMedication {
    return new AppointmentDiagnosticTreatmentMedication(
      new StringValueObject(primitive.name),
      new StringValueObject(primitive.dose),
      new StringValueObject(primitive.frequency)
    );
  }
}
