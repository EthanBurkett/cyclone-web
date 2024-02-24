import { getUser } from "@/actions";
import { lucia, validateRequest } from "@/auth";
import UserModel from "@/models/User.model";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request): Promise<Response> {
  cookies().delete("discord_oauth_state");
  const user = await getUser();
  const { session } = await validateRequest();

  if (!session || !session.id || !user)
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });

  await UserModel.findOneAndDelete({
    _id: user?._id,
  });

  cookies().delete(lucia.sessionCookieName);
  lucia.invalidateSession(session?.id!);

  return redirect("/");
}
