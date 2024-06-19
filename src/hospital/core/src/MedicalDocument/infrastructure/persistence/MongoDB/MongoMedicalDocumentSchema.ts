import { Schema } from 'mongoose';

export const MongoMedicalDocumentSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    userId: { type: Schema.Types.UUID, required: true, index: true },
    type: { type: String, required: true },
    description: { type: String },
    name: { type: String, required: true },
    url: { type: String, default: '/file.png' },
  },
  { timestamps: true, _id: false },
);
