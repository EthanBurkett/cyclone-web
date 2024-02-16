"use client";
import { User } from "@/models/User.model";
import React, { useState } from "react";
import Image from "next/image";

type Props = {
  avatarURL: string;
};

const UserButton = ({ avatarURL }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col justify-end">
      <div className="w-12 h-12 rounded-full overflow-hidden cursor-pointer">
        <Image src={avatarURL} alt="profile image" width={64} height={64} />
      </div>
      <div className="w-56 h-14 bg-red-500"></div>
    </div>
  );
};

export default UserButton;
