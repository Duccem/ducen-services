import { Schema } from 'mongoose';

export const MongoFlagSchema = new Schema(
  {
    id: { type: Schema.Types.UUID, required: true, index: true },
    name: { type: String, required: true },
    attributes: { type: Schema.Types.Mixed },
    handlers: [{ type: String }],
    enabled: { type: Boolean, default: true },
  },
  { timestamps: true, _id: false },
);
