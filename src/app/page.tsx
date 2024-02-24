import Image from "next/image";
import dbConnect from "../lib/db";
import Navbar, { PrimaryButton, SecondaryButton } from "./(components)/Navbar";
import { getProfileImage, getUser } from "@/actions";

export default async function Home() {
  const user = await getUser();

  return (
    <main className="w-full h-full bg-navy-900 overflow-hidden relative">
      <Navbar user={user} />
      <div className="absolute z-10 top-0 left-0 w-full h-full  justify-center items-center overflow-y-scroll overflow-x-hidden">
        <div className="w-full h-full flex flex-row justify-evenly items-center">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h1 className="text-5xl font-extrabold max-w-96 text-wrap text-white tracking-wide leading-[1.1]">
                The easiest bot to handle complicated problems.
              </h1>
              <p className="text-white/60">
                Making your discord server owner experience easier, as a whole.
              </p>
            </div>
            <div className="flex flex-row gap-4">
              <PrimaryButton>Get started</PrimaryButton>
              <SecondaryButton>Invite me</SecondaryButton>
            </div>
          </div>
          <div className="flex flex-col gap-6 justify-center items-center p-2 rounded-lg bg-main">
            <Image
              src="/stats-look.png"
              alt="stats look"
              width={768}
              height={812}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
