import { getUser } from "@/actions";
import { getGuilds } from "@/controllers/guildsController";
import { DiscordApi, Fetch } from "@/util";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  const req = await getGuilds(`Bearer ${user?.accessToken}`);

  return new NextResponse(JSON.stringify(req));
}
