"use client";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { GetGlobalIcon, Icons } from "@/util/react";
import { FaChevronRight, FaDiscord, FaUser } from "react-icons/fa";
import { OAuthGuild, getGuild } from "@/controllers/guildsController";
import { MdDashboard } from "react-icons/md";
import Image from "next/image";
import { ShorthandGuildName } from "@/util";

type Props = {
  guild?: OAuthGuild;
};

export const Links: {
  link: string;
  name: string;
  href: string;
  icon: React.JSX.Element;
  guild?: boolean;
}[] = [
  {
    link: "",
    name: "Dashboard",
    href: "/me",
    icon: <MdDashboard color="white" size={14} />,
  },
  {
    link: "profile",
    name: "Profile",
    href: "/me/profile",
    icon: <FaUser color="white" size={14} />,
  },
  {
    link: "guilds",
    name: "Guild",
    href: "/me",
    icon: <FaDiscord color="white" size={14} />,
  },
];

const DashboardNavbar = (props: Props) => {
  const pathname = usePathname();
  const route = pathname.split("/").filter((el) => el != "me");
  let first = route[0];
  const last = route[route.length - 1];

  return (
    <div className="p-6 w-full flex justify-between items-center text-white">
      <div className="flex flex-col justify-between items-start gap-2">
        <div className="flex-row flex gap-2">
          {route.map((where) => {
            let item = Links.find((l) => l.link == where);
            if (!isNaN(parseInt(where))) {
              item = {
                href: `/guilds/${props.guild?.id}`,
                icon: props.guild?.icon ? (
                  <Image
                    alt={props.guild.name}
                    src={`https://cdn.discordapp.com/icons/${props.guild.id}/${props.guild.icon}`}
                    width={20}
                    height={20}
                    className={`rounded-full flex justify-center items-center place-self-center bg-white/[0.16] text-white`}
                  />
                ) : (
                  <div
                    className={`w-5 h-5 rounded-full flex justify-center text-sm items-center place-self-center bg-white/[0.16] text-white`}
                  >
                    {ShorthandGuildName(props.guild?.name!)}
                  </div>
                ),
                link: props.guild?.id!,
                name: props.guild?.name!,
              };
            }
            if (!item) return;
            const isFirst = first == item.link;
            const isLast = last == item.link;
            return (
              <div
                key={where}
                className="flex flex-row gap-2 justify-center items-center"
              >
                <Link href={`${item.href}`} className="flex flex-row">
                  <div className="px-2 py-1 text-sm flex-row flex items-center justify-center gap-2 rounded-xl text-brand-100 bg-[rgba(117,81,255,0.2)]">
                    {item.icon}
                    {item.name}
                  </div>
                </Link>
                {isFirst && !isLast && (
                  <FaChevronRight size={14} className=" text-brand-100" />
                )}
                {!isFirst && !isLast && (
                  <FaChevronRight size={14} className=" text-brand-100" />
                )}
              </div>
            );
          })}
        </div>
        <h1 className="font-bold text-4xl">
          {Links.find((l) => last == l.link)?.name}
        </h1>
      </div>
      <div>profile</div>
    </div>
  );
};

export default DashboardNavbar;
