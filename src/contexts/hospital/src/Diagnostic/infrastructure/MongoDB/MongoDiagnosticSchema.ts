import { Schema } from 'mongoose';

export const MongoDiagnosticSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    doctorId: { type: Schema.Types.UUID, required: true },
    appointmentId: { type: Schema.Types.UUID, required: true },
    description: { type: String },
    code: { type: String, required: true },
    status: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true, _id: false, versionKey: false },
);
