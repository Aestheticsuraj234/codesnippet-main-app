import React from "react";
import { Button } from "../ui/button";
import RocketSvg from "@/public/Rocket.svg"; // import the animated SVG
import { Gift } from "lucide-react";
import Image from "next/image";
import GithubCode from "./GithubCode";

const HomeComponent = () => {
  return (
    <div className="pt-[98px] mt-20 flex flex-1 items-center justify-between">
      <div className="flex flex-col justify-center items-start gap-11 max-w-[50%]">
        <h1 className="font-extrabold text-[#E5ECEA] text-4xl lg:text-6xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
          <span className="relative">Ship your startup</span>
          <span className="whitespace-nowrap relative ">
            <span className="mr-3 sm:mr-4 md:mr-5 text-[#E5ECEA]">
              in days,
            </span>
            <span className=" relative whitespace-nowrap">
              <span className="absolute bg-[#03DC7A] -left-2 -top-1 -bottom-1 -right-2 md:-left-3 md:-top-0 md:-bottom-0 md:-right-3 -rotate-1"></span>
              <span className="relative  text-neutral text-[#1e201f]">
                not weeks
              </span>
            </span>
          </span>
        </h1>

        <p className="text-lg opacity-80 leading-relaxed text-[#E5ECEA]">
          The NextJS & shadcn/ui boilerplate with all you need to build your
          SaaS, AI tool, Real Time Collaborative or any other web app and make
          your first money💸 online fast.
        </p>

        <Button
          variant={"brand"}
          className="flex items-center    justify-center gap-3 font-bold text-md "
        >
          🚀 Get LaunchFast
        </Button>

        <div className="text-white flex ">
          <span className="text-yellow-500 flex flex-row justify-center gap-1 items-center px-2">
            {" "}
            <Gift /> ₹1999 off
          </span>{" "}
          for the first 1999 customers
        </div>
      </div>

      <div className="flex max-w-[50%] flex-col items-center justify-center gap-7">
        <Image
          src="/Home4.svg"
          height={1080}
          width={1080}
          alt="Home-Wallpaper"
          className="w-full max-w-xl  ml-auto"
        />

        <GithubCode />
      </div>
    </div>
  );
};

export default HomeComponent;
