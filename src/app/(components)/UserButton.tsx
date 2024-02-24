"use client";
import { User } from "@/models/User.model";
import React, { useState } from "react";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { IoLogOut } from "react-icons/io5";
import Link from "next/link";

type Props = {
  avatarURL: string;
};

const UserButton = ({ avatarURL }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex flex-col rounded-full relative justify-start">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="w-12 h-12 flex justify-center items-center rounded-full p-0 overflow-hidden">
            <Image src={avatarURL} alt="profile image" width={48} height={48} />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-main text-white">
            <Link href="/logout">
              <div className="px-3 py-2 flex flex-row gap-2 justify-center items-center cursor-pointer transition-all hover:bg-primary hover:text-black group">
                <IoLogOut
                  className="text-white group-hover:text-black transition-all"
                  size={16}
                />
                Logout
              </div>
            </Link>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default UserButton;
