import { Schema, model, Document, models, Model } from "mongoose";

export interface Session extends Document {
  _id: string;
  user_id: string;
  expires_at: Date;
}

const schema = new Schema<Session>(
  {
    _id: {
      type: String,
      required: true,
    },

    user_id: {
      type: String,
      required: true,
    },
    expires_at: {
      type: Date,
      required: true,
    },
  } as const,
  {
    _id: false,
  }
);

export default (models.Session ||
  model<Session>("Session", schema)) as Model<Session>;
