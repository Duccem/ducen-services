import { Schema } from 'mongoose';

export const MongoNoteSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    doctor: {
      id: { type: Schema.Types.UUID, required: true },
      fullName: { type: String },
      photo: { type: String },
      specialty: { type: String },
    },
    content: { type: String, required: true },
  },
  { timestamps: true, _id: false },
);
