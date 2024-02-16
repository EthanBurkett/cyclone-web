"use server";

import { validateRequest } from "@/auth";
import UserModel, { User } from "@/models/User.model";
import { Fetch } from "@/util";

export const getUser = async (): Promise<User | undefined> => {
  const req = await validateRequest();
  const user = await UserModel.findOne({
    _id: req.session?.userId,
  });

  if (!user) return undefined;

  return user;
};

export const getProfileImage = async (
  userId: string,
  avatar: string
): Promise<string> => {
  const link = (ext: "gif" | "webp") =>
    `https://cdn.discordapp.com/avatars/${userId}/${avatar}.${ext}?size=80`;
  const res = await Fetch({
    url: link("gif"),
  });

  if (res.error || !res.data) return link("webp");
  return link("gif");
};
