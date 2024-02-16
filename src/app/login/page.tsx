import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function Login() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }

  console.log(user);
  return (
    <>
      <h1>Sign in</h1>
      <a href="/login/discord">Sign in with Discord</a>
    </>
  );
}
