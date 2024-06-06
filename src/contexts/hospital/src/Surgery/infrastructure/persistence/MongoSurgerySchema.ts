import { Schema } from 'mongoose';

export const MongoSurgerySchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    details: { type: String },
    surgeon: { type: String },
    clinic: { type: String },
  },
  { timestamps: true, _id: false },
);
