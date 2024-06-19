import { Enum } from '@ducen/shared';

export enum AppointmentDocumentTypes {
  LAB_RESULT = 'LAB_RESULT',
  PRESCRIPTION = 'PRESCRIPTION',
  OTHER = 'OTHER',
}
export class AppointmentDocumentType extends Enum<AppointmentDocumentTypes> {
  constructor(type: AppointmentDocumentTypes) {
    super(type, Object.values(AppointmentDocumentTypes));
  }

  static other(): AppointmentDocumentType {
    return new AppointmentDocumentType(AppointmentDocumentTypes.OTHER);
  }
}
