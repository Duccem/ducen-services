import { Schema } from 'mongoose';

export const MongoAppointmentSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    patientId: { type: Schema.Types.UUID, required: true, index: true },
    doctorId: { type: Schema.Types.UUID, required: true, index: true },
    type: { type: String, required: true },
    initDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    room: {
      token: { type: String, required: true },
      room: { type: String, required: true },
      url: { type: String, required: true },
    },
    status: { type: String, required: true },
    rating: {
      rate: { type: Number },
      comment: { type: String },
    },
    telemetry: {
      weight: { type: Number },
      height: { type: Number },
      imc: { type: Number },
      heartRate: { type: Number },
      bloodPressure: { type: Number },
    },
    diagnostic: {
      description: { type: String },
      code: { type: String },
      treatment: {
        type: { type: String },
        description: { type: String },
        instructions: { type: String },
        initDate: { type: Date },
        endDate: { type: Date },
        medications: [
          {
            name: { type: String },
            dose: { type: String },
            frequency: { type: String },
          },
        ],
      },
    },
    documents: [
      {
        type: { type: String },
        name: { type: String },
        url: { type: String },
      },
    ],
    recipesConsult: [
      {
        type: { type: String },
        date: { type: Date },
        reason: { type: String },
        observations: { type: String },
        endDate: { type: Date },
      },
    ],
    recipesPrescription: [
      {
        type: { type: String },
        date: { type: Date },
        instructions: { type: String },
        endDate: { type: Date },
        medications: [
          {
            name: { type: String },
            dose: { type: String },
            frequency: { type: String },
          },
        ],
      },
    ],
    recipesTest: [
      {
        type: { type: String },
        date: { type: Date },
        endDate: { type: Date },
        exams: [String],
      },
    ],
  },
  { timestamps: true, _id: false },
);
