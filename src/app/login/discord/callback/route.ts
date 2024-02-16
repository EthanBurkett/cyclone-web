import { discord, lucia } from "@/auth";
import db from "@/lib/db";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateId } from "lucia";
import mongoose from "mongoose";
import UserModel, { User } from "@/models/User.model";
import { DiscordApi } from "@/util";
import { getProfileImage } from "@/actions";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("discord_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    console.log({ code, state, storedState });
    return new Response(null, {
      status: 400,
    });
  }

  try {
    const tokens = await discord.validateAuthorizationCode(code);
    const discordUserResponse = await fetch(`${DiscordApi}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const discordUser: DiscordUser = await discordUserResponse.json();
    // console.log(discordUser);
    const existingUser = await UserModel.findOne({
      discordId: discordUser.id,
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      await UserModel.findOneAndUpdate(
        {
          _id: session.userId,
        },
        {
          avatarURL: await getProfileImage(discordUser.id, discordUser.avatar),
        }
      );

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateId(15);

    await UserModel.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        _id: userId,
        discordId: discordUser.id,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        avatarURL: await getProfileImage(discordUser.id, discordUser.avatar),
      },
      {
        upsert: true,
      }
    )
      .then(() => console.log("model created"))
      .catch((e) => console.log(e));
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.log(e);
    if (
      e instanceof OAuth2RequestError &&
      e.message === "bad_verification_code"
    ) {
      // invalid code
      console.log("bad code");
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}

interface DiscordUser {
  id: string;
  login: string;
  avatar: string;
}
