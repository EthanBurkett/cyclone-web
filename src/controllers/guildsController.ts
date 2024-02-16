import { User } from "@/models/User.model";
import { Fetch } from "@/util";

export interface OAuthGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

export const getGuilds = async (authorization: string) => {
  const req = await Fetch<OAuthGuild[]>({
    url: "/users/@me/guilds",
    headers: {
      Authorization: authorization,
    },
  });

  return req;
};

export const getMutualGuilds = async (user: User | undefined) => {
  if (!user) return;

  const userGuilds = await getGuilds(`Bearer ${user.accessToken}`);
  if (
    !userGuilds ||
    !userGuilds.data ||
    (userGuilds.data as any).code ||
    userGuilds.data.length < 1
  )
    return;

  const botGuilds = await getGuilds(`Bot ${process.env.DISCORD_ACCESS_TOKEN!}`);
  if (
    !botGuilds ||
    !botGuilds.data ||
    (botGuilds.data as any).code ||
    botGuilds.data.length < 1
  )
    return;

  const adminUserGuilds = userGuilds.data.filter(
    ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
  );

  return adminUserGuilds.filter((guild) =>
    botGuilds.data?.some((botGuild) => botGuild.id == guild.id)
  );
};
