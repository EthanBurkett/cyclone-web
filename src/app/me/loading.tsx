import React from "react";
import Image from "next/image";
import { HiExternalLink } from "react-icons/hi";

type Props = {};

const loading = async (props: Props) => {
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
          {[...new Array<null>(9)]?.map((_, i) => (
            <div
              key={i}
              className={`min-h-24 max-h-24 w-full flex flex-row justify-between items-center relative min-w-0 rounded-xl p-4 animate-pulse bg-gradient-to-tr from-navy-700 to-navy-800 cursor-pointer`}
            >
              <div
                className={`w-3/4 flex flex-row gap-3 items-start justify-start [overflow-wrap:break-word]`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loading;
