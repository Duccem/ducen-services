import { Schema } from 'mongoose';

export const MongoMedicalTestSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    type: { type: String, required: true },
    laboratory: { type: String },
    date: { type: Date, required: true },
    attributes: [
      {
        category: { type: String },
        name: { type: String },
        metric: { type: String },
        unit: { type: String },
        referenceRange: { type: String },
      },
    ],
  },
  { timestamps: true, _id: false },
);
