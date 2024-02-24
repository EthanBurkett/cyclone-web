"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Links } from "./Navbar";
import { OAuthGuild, getGuilds } from "@/controllers/guildsController";
import { ShorthandGuildName } from "@/util";

type Props = {
  guilds?: OAuthGuild[];
};

const Sidebar = ({ guilds }: Props) => {
  const pathname = usePathname();
  const route = pathname.split("/").filter((el) => el != "me");
  let activeGuild: string | null = null;
  for (const path of route) {
    if (!isNaN(parseInt(path))) {
      activeGuild = path;
      break;
    }
    continue;
  }

  return (
    <div className="h-full max-w-72 w-full bg-navy-800 p-4 flex flex-col gap-4">
      <div className="w-full h-24 bg-brand-400 flex justify-center items-center rounded-lg text-3xl font-bold text-white">
        Cyclone
      </div>
      <div className="flex flex-col gap-2 h-full overflow-y-scroll text-white">
        {Links.map((item) => {
          if (item.link == "guilds") return;
          const active = route[route.length - 1] == item.link;
          return (
            <Link key={item.link} href={`${item.href}`}>
              <SidebarNavItem active={active}>
                <div
                  className={`p-2 border-2 rounded-xl shadow-[0px_0px_15px] ${
                    active
                      ? "bg-brand-400 border-brand-200 shadow-brandAlpha-500"
                      : "bg-transparent border-white/[.24] shadow-[rgba(112,144,176,0.3)]"
                  }`}
                >
                  {item.icon}
                </div>
                {item.name}
              </SidebarNavItem>
            </Link>
          );
        })}
        {guilds &&
          guilds.map((guild) => (
            <GuildCard
              guild={guild}
              key={guild.id}
              active={activeGuild == guild.id}
            />
          ))}
      </div>
    </div>
  );
};

const GuildCard = ({
  guild,
  active,
}: {
  guild: OAuthGuild;
  active: boolean;
}) => (
  <Link href={`/guilds/${guild.id}`}>
    <div
      className={`flex flex-col p-4 w-full gap-3 justify-start items-start rounded-xl ${
        active ? "bg-brand-400" : "bg-navy-900"
      }`}
    >
      {guild.icon ? (
        <Image
          alt={ShorthandGuildName(guild.name)}
          src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
          width={48}
          height={48}
          className={`rounded-full flex justify-center items-center bg-brand-300`}
        />
      ) : (
        <div
          className={`w-12 h-12 rounded-full flex justify-center items-center bg-brand-300`}
        >
          {ShorthandGuildName(guild.name)}
        </div>
      )}
      <h2 className="text-base font-bold">{guild.name}</h2>
    </div>
  </Link>
);

const SidebarNavItem = ({
  children,
  active,
}: {
  children: React.ReactNode;
  active: boolean;
}) => (
  <div
    className={`flex flex-row w-full h-12 items-center gap-3 p-2 rounded-xl font-medium ${
      active
        ? "bg-white/[0.06] cursor-default pointer-events-none text-white"
        : "transparent cursor-pointer pointer-events-auto text-secondaryGray-500"
    }`}
  >
    {children}
  </div>
);

export default Sidebar;
