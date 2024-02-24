import { User } from "@/models/User.model";
import { Fetch, IResponse } from "@/util";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export interface OAuthGuild {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
}

class DiscordResponse<TExpect> {
  private _data?: TExpect;
  private _error?: {
    message: string;
    detailed: Error;
  };
  private _retry?: number;

  constructor(response: IResponse<TExpect>) {
    this._data = response.data;
    this._error = response.error;
    if ((response as any).data.retry_after) {
      this._retry = (response as any).data.retry_after;
    }
  }

  public get data() {
    return this._data;
  }

  public get error() {
    return this._error;
  }

  public get retry() {
    return this._retry;
  }
}

export const getGuilds = async (authorization: string) => {
  const req = await Fetch<OAuthGuild[]>({
    url: "/users/@me/guilds",
    headers: {
      Authorization: authorization,
    },
    cache: "force-cache",
  });

  const res = new DiscordResponse<OAuthGuild[]>(req);

  return res;
};

const getUserGuilds = (
  user: User | undefined
): Promise<DiscordResponse<OAuthGuild[]>> => {
  return new Promise(async (resolve, reject) => {
    if (!user) return;
    let userGuilds = await getGuilds(`Bearer ${user.accessToken}`);
    if (
      !userGuilds ||
      !userGuilds.data ||
      (userGuilds.data as any).code ||
      userGuilds.data.length < 1
    )
      reject("no guilds");

    resolve(userGuilds);
  });
};

const getBotGuilds = (): Promise<DiscordResponse<OAuthGuild[]>> => {
  return new Promise(async (resolve, reject) => {
    let botGuilds = await getGuilds(`Bot ${process.env.DISCORD_ACCESS_TOKEN}`);

    if (
      !botGuilds ||
      !botGuilds.data ||
      (botGuilds.data as any).code ||
      botGuilds.data.length < 1
    )
      reject("no guilds");

    resolve(botGuilds);
  });
};

export const getMutualGuilds = async (user: User | undefined) => {
  if (!user) return;

  const userGuilds = await getUserGuilds(user).then((d) => d);
  const botGuilds = await getBotGuilds().then((d) => d);

  const adminUserGuilds = userGuilds?.data?.filter(
    ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
  );

  return adminUserGuilds?.filter((guild) =>
    botGuilds.data?.some((botGuild) => botGuild.id == guild.id)
  );
};

export const getUserAdminGuilds = async (user: User | undefined) => {
  if (!user) return;

  const userGuilds = await getUserGuilds(user).then((d) => d);

  const adminUserGuilds = userGuilds?.data?.filter(
    ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
  );

  return adminUserGuilds;
};

export const getGeneralGuilds = async (user: User | undefined) => {
  if (!user) return;

  return new Promise(
    async (
      resolve: (body: {
        adminUserGuilds?: OAuthGuild[];
        userGuilds?: DiscordResponse<OAuthGuild[]>;
        botGuilds?: DiscordResponse<OAuthGuild[]>;
        mutualGuilds?: OAuthGuild[];
      }) => void,
      reject
    ) => {
      const userGuilds = await getUserGuilds(user).then((d) => d);
      const botGuilds = await getBotGuilds().then((d) => d);

      const adminUserGuilds = userGuilds?.data?.filter(
        ({ permissions }) => (parseInt(permissions) & 0x8) === 0x8
      );

      const mutualGuilds = adminUserGuilds?.filter((guild) =>
        botGuilds.data?.some((botGuild) => botGuild.id == guild.id)
      );

      resolve({
        adminUserGuilds,
        userGuilds,
        botGuilds,
        mutualGuilds,
      });
    }
  );
};

export const getGuild = async (id: string) => {
  return new DiscordResponse(
    await Fetch<OAuthGuild>({
      url: `/guilds/${id}`,
      headers: {
        Authorization: `Bot ${process.env.DISCORD_ACCESS_TOKEN}`,
      },
    })
  );
};
