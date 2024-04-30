import { Enum } from '@ducen-services/shared';

export enum MedicalDocumentTypes {
  MEDICAL_RECORD = 'medical_record',
  PRESCRIPTION = 'prescription',
  LABORATORY = 'laboratory',
  IMAGING = 'imaging',
  OTHER = 'other',
  RADIOLOGY = 'radiology',
}
export class MedicalDocumentType extends Enum<MedicalDocumentTypes> {
  constructor(value: MedicalDocumentTypes) {
    super(value, Object.values(MedicalDocumentTypes));
  }
}
