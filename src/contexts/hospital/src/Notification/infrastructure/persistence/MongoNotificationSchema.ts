import { Schema } from 'mongoose';

export const MongoNotificationSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    userId: { type: Schema.Types.UUID, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    types: [{ type: String, required: true }],
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true },
);
