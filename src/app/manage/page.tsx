import React from "react";
import Navbar from "../(components)/Navbar";
import { getUser } from "@/actions";

type Props = {};

const Manage = async (props: Props) => {
  const user = await getUser();
  return (
    <main className="w-full h-full bg-main-dark overflow-hidden relative">
      <Navbar user={user} />
      <div className="absolute z-10 top-0 left-0 w-full h-full  justify-center items-center overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-full flex flex-row justify-evenly items-center"></div>
      </div>
    </main>
  );
};

export default Manage;
