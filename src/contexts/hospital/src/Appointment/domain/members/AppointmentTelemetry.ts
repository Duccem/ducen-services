import { NumberValueObject } from '@ducen-services/shared';

export class AppointmentTelemetry {
  constructor(
    public weight: NumberValueObject,
    public height: NumberValueObject,
    public imc: NumberValueObject,
    public bloodPressure: NumberValueObject,
    public heartRate: NumberValueObject,
  ) {}

  toPrimitives() {
    return {
      weight: this.weight.value,
      height: this.height.value,
      imc: this.imc.value,
      bloodPressure: this.bloodPressure.value,
      heartRate: this.heartRate.value,
    };
  }

  static fromPrimitives(primitives: any): AppointmentTelemetry {
    return new AppointmentTelemetry(
      new NumberValueObject(primitives.weight),
      new NumberValueObject(primitives.height),
      new NumberValueObject(primitives.imc),
      new NumberValueObject(primitives.bloodPressure),
      new NumberValueObject(primitives.heartRate),
    );
  }

  static waitingForMeasurements(): AppointmentTelemetry {
    return new AppointmentTelemetry(
      new NumberValueObject(0),
      new NumberValueObject(0),
      new NumberValueObject(0),
      new NumberValueObject(0),
      new NumberValueObject(0),
    );
  }
}
