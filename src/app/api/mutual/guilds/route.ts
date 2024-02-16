import { getUser } from "@/actions";
import { getMutualGuilds } from "@/controllers/guildsController";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  const req = await getMutualGuilds(user);

  return new NextResponse(JSON.stringify(req));
}
