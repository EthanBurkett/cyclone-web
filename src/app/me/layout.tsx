import React from "react";
import Sidebar from "../(components)/Dashboard/Sidebar";
import Navbar from "../(components)/Dashboard/Navbar";
import { getUser } from "@/actions";
import { getMutualGuilds } from "@/controllers/guildsController";

type Props = {
  children: React.ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await getUser();
  if (!user) return;

  const mutual = await getMutualGuilds(user);

  return (
    <main className="flex flex-row justify-start w-full h-full">
      <Sidebar guilds={mutual} />
      <div className="w-full h-full bg-navy-900 text-white justify-center items-center p-6 flex flex-col">
        <div className="max-w-screen-xl w-full h-full flex flex-col justify-start items-center gap-12">
          <Navbar />
          <div className="flex flex-col gap-6 w-full">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default layout;
