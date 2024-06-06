import { Schema } from 'mongoose';

export const MongoTreatmentSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    doctorId: { type: Schema.Types.UUID, required: true },
    appointmentId: { type: Schema.Types.UUID },
    type: { type: String, required: true },
    description: { type: String },
    instructions: { type: String },
    status: { type: String, required: true },
    duration: {
      years: { type: Number },
      months: { type: Number },
      weeks: { type: Number },
      days: { type: Number },
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    medicaments: [
      {
        name: { type: String },
        dose: { type: String },
        frequency: { type: String },
        duration: { type: Number },
      },
    ],
  },
  { timestamps: true, _id: false },
);
