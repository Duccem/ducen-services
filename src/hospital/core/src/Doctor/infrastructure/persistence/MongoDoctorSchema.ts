import { Schema } from 'mongoose';

export const MongoDoctorSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true },
    userId: { type: Schema.Types.UUID, required: true },
    specialty: { type: String, required: true },
    medicalIdentificationNumber: { type: String, required: true },
    licenseMedicalNumber: { type: String, required: true },
    score: { type: Number },
    consultingRoomAddress: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
      zipCode: { type: String },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    educations: [
      {
        title: { type: String },
        institution: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
        type: { type: String },
      },
    ],
    experiences: [
      {
        title: { type: String },
        institution: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    associations: [
      {
        entity: { type: String },
        startDate: { type: Date },
        endDate: { type: Date },
      },
    ],
    schedule: {
      days: [
        {
          weekDay: { type: Number },
          sections: [
            {
              initHour: { type: String },
              endHour: { type: String },
            },
          ],
        },
      ],
      appointmentDuration: { type: Number },
      maxAppointmentsPerDay: { type: Number },
    },
  },
  { timestamps: true, _id: false },
);
