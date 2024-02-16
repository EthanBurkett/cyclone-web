import { Schema, model, Document, models, Model } from "mongoose";

export interface User extends Document {
  _id: string;
  discordId: string;
  accessToken: string;
  refreshToken: string;
  avatarURL: string;
}

const schema = new Schema<User>(
  {
    _id: {
      type: String,
      required: true,
    },
    discordId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  } as const,
  {
    _id: false,
  }
);

export default (models.User || model<User>("User", schema)) as Model<User>;
