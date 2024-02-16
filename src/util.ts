import { cookies } from "next/headers";
import { lucia, validateRequest } from "./auth";
import UserModel from "./models/User.model";

export const DiscordApi = `https://discord.com/api/v10`;

export interface IResponse<T> {
  data?: T;
  error?: {
    message: string;
    detailed: any;
  };
}

export const Fetch = async <T>({
  url,
  headers,
  withAuth = true,
  method = "GET",
  body,
}: {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: { [key: string]: string };
  withAuth?: boolean;
  body?: Record<string, any>;
}): Promise<IResponse<T>> => {
  const response = (await fetch(
    `${url.includes("http") ? url : `${DiscordApi}${url}`}`,
    {
      method: method ? method : "GET",
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        ...headers,
      },
    }
  )
    .then(async (d) => {
      const data = await d.json();
      if (data.error) throw new Error(data.error);
      return {
        data,
      };
    })
    .catch((e) => {
      return {
        error: {
          message: e.message,
          detailed: e,
        },
      };
    })) as IResponse<T>;

  return response;
};
