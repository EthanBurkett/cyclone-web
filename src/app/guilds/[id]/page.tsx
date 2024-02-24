import { getUser } from "@/actions";
import Navbar from "@/app/(components)/Dashboard/Navbar";
import Sidebar from "@/app/(components)/Dashboard/Sidebar";
import { getGuild, getMutualGuilds } from "@/controllers/guildsController";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const user = await getUser();
  const mutual = await getMutualGuilds(user);

  const userInGuild = mutual?.find((g) => g.id == params.id);

  if (!userInGuild) return redirect(`/me`);

  const guild = await getGuild(params.id);
  if (!guild.data || guild.retry || guild.error) return redirect("/me");

  return (
    <main className="flex flex-row justify-start w-full h-full">
      <Sidebar guilds={mutual} />
      <div className="w-full h-full bg-navy-900 text-white justify-center items-center p-6 flex flex-col">
        <div className="max-w-screen-xl w-full h-full flex flex-col justify-start items-center gap-12">
          <Navbar guild={guild.data} />
          <div className="flex flex-col gap-6 w-full"></div>
        </div>
      </div>
    </main>
  );
};

export default page;
