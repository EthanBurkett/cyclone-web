import { User } from "@/models/User.model";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import UserButton from "./UserButton";

type Props = {
  user?: User;
};

const Navbar = ({ user }: Props) => {
  return (
    <div className="w-full z-50 h-24 bg-main-dark flex justify-between items-center px-12 py-6 absolute left-0 top-0">
      <Link href="/">
        <div className="flex flex-row gap-6 justify-start items-center">
          <Image width={64} height={64} src="/cyclone.png" alt="logo" />
          <h1 className="text-white font-extrabold text-3xl ">Cyclone</h1>
        </div>
      </Link>
      <div className="nav-links flex flex-row gap-4 justify-end items-center">
        {user ? (
          <div className="flex flex-row gap-4 items-center">
            <Link href="/manage">
              <PrimaryButton>Dashboard</PrimaryButton>
            </Link>
            <UserButton avatarURL={user.avatarURL} />
          </div>
        ) : (
          <Link href="/login/discord">
            <PrimaryButton>Sign In</PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
};

const NavLink = (props: { children: React.ReactNode }) => (
  <li className="list-none text-white p-4">{props.children}</li>
);

export const PrimaryButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button
    className={`bg-primary px-8 py-2 rounded-xl text-main ${props.className}`}
    {...props}
  >
    {props.children}
  </button>
);

export const SecondaryButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button
    className={`${props.className} bg-secondary px-8 py-2 rounded-xl text-main `}
    {...props}
  >
    {props.children}
  </button>
);

export default Navbar;
