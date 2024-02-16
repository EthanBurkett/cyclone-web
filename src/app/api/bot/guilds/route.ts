import { getUser } from "@/actions";
import { getGuilds } from "@/controllers/guildsController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const req = await getGuilds(`Bot ${process.env.DISCORD_ACCESS_TOKEN!}`);

  return new NextResponse(JSON.stringify(req));
}
