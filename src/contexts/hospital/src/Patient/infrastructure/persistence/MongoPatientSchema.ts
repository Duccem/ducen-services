import { Schema } from 'mongoose';

export const MongoPatientSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    userId: { type: Schema.Types.UUID, required: true, index: true },
    allergies: [
      {
        diagnosticId: { type: Schema.Types.UUID, required: true },
        diagnosticDate: { type: Date, required: true },
        name: { type: String, required: true },
        description: { type: String },
        severity: { type: String },
        reaction: { type: String },
      },
    ],
  },
  { timestamps: true, _id: false },
);
