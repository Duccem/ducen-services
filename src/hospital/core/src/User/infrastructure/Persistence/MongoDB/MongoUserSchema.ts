import { Schema } from 'mongoose';

export const MongoUserSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    name: {
      firstName: { type: String, required: true, index: true },
      lastName: { type: String, required: true, index: true },
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    birthDate: { type: Date },
    address: {
      street: { type: String },
      city: { type: String },
      country: { type: String },
      zipCode: { type: String },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number },
      },
    },
    phoneNumber: { type: String },
    photo: { type: String, default: '/default-image.png' },
    gender: { type: String },
    configuration: {
      timezone: { type: String },
      lang: { type: String },
      theme: { type: String },
    },
    devices: [
      {
        agent: { type: String },
        token: { type: String },
      },
    ],
    isActive: { type: Boolean, default: false },
    verificationCode: { type: String },
  },
  { timestamps: true, _id: false, collection: 'user' },
);
