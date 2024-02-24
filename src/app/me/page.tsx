import React from "react";
import { getUser } from "@/actions";
import { OAuthGuild, getGeneralGuilds } from "@/controllers/guildsController";
import { redirect } from "next/navigation";
import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";
import { ShorthandGuildName } from "@/util";
import Link from "next/link";
import { PrimaryButton } from "../(components)/Navbar";

type Props = {};

const Manage = async (props: Props) => {
  const user = await getUser();
  const allGuilds = await getGeneralGuilds(user);

  if (!allGuilds) redirect("/manage");

  const { adminUserGuilds: guilds, mutualGuilds } = allGuilds;

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full bg-brand-400 h-36 rounded-xl p-6 flex gap-8 flex-row">
        <div className="w-24 h-24 p-2 flex justify-center items-center rounded-full bg-gradient-to-br from-transparent to-[rgba(0,0,0,0.48)]">
          <Image
            src={"/cyclone_blue.webp"}
            alt="bot logo"
            width={96}
            height={96}
          />
        </div>
        <div className="flex flex-col justify-between items-start">
          <div className="flex flex-col">
            <h1 className="text-xl text-white font-extrabold leading-[1.2]">
              Invite cyclone
            </h1>
            <p className="text-white/80">
              Try out cyclone to see how you like it!
            </p>
          </div>
          <button className="bg-white/[.08] transition-all hover:bg-white/[0.16] p-2 justify-center items-center font-bold flex rounded-xl flex-row gap-2">
            <HiExternalLink size={24} />
            Invite now
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <h2 className="font-bold text-xl">Select Server</h2>
          <p className="text-white/60">Select a server to configure</p>
        </div>
        <div className="grid grid-cols-3 gap-2 grid-rows-3 w-full overflow-y-scroll">
          {mutualGuilds?.map((mGuild) => (
            <GuildCard guild={mGuild} isMutual={true} key={mGuild.id} />
          ))}
          {guilds
            ?.filter((g) => mutualGuilds?.some((mG) => mG.id !== g.id))
            .map((guild) => (
              <GuildCard guild={guild} isMutual={false} key={guild.id} />
            ))}
        </div>
      </div>
    </div>
  );
};

const GuildCard = ({
  guild,
  isMutual,
}: {
  guild: OAuthGuild;
  isMutual: boolean;
}) => {
  const name = ShorthandGuildName(guild.name);

  return isMutual ? (
    <Link href={`/guilds/${guild.id}`}>
      <div
        className={`min-h-24 max-h-24 w-full flex flex-row justify-between items-center relative min-w-0 rounded-xl p-4 bg-navy-800 cursor-pointer`}
      >
        <div
          className={`w-3/4 flex flex-row gap-3 items-start justify-start [overflow-wrap:break-word]`}
        >
          {guild.icon ? (
            <Image
              alt={name}
              src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
              width={48}
              height={48}
              className={`rounded-full flex justify-center items-center place-self-center bg-brand-300`}
            />
          ) : (
            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center place-self-center bg-brand-300`}
            >
              {name}
            </div>
          )}

          <h3 className="text-medium font-bold text-wrap w-3/4 text-ellipsis">
            {guild.name}
          </h3>
        </div>
      </div>
    </Link>
  ) : (
    <div
      className={`min-h-24 max-h-24 w-full flex flex-row justify-between items-center relative min-w-0 rounded-xl p-4 bg-white/[0.02] cursor-default`}
    >
      <div
        className={`w-3/4 flex flex-row gap-3 items-start justify-start [overflow-wrap:break-word]`}
      >
        {guild.icon ? (
          <Image
            alt={name}
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}`}
            width={48}
            height={48}
            className={`rounded-full flex justify-center items-center place-self-center bg-white/[0.16] text-white grayscale`}
          />
        ) : (
          <div
            className={`w-12 h-12 rounded-full flex justify-center items-center place-self-center bg-white/[0.16] text-white`}
          >
            {name}
          </div>
        )}

        <h3 className="text-medium font-bold text-wrap w-3/4 text-ellipsis">
          {guild.name}
        </h3>
      </div>
      <div className="w-1/4 flex justify-start m-2">
        <Link
          href={`https://discord.com/oauth2/authorize?client_id=1202779483367673996&permissions=8&scope=bot+applications.commands&guild_id=${guild.id}`}
        >
          <PrimaryButton>Invite</PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default Manage;
