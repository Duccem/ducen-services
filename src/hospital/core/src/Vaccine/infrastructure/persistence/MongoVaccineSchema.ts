import { Schema } from 'mongoose';

export const MongoVaccineSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true },
    name: { type: String },
    dose: { type: String },
    date: { type: Date },
    notes: { type: [String] },
    nextDose: { type: Date },
    effective: { type: Boolean },
    required: { type: Boolean },
  },
  { timestamps: true, _id: false },
);
