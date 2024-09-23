import React from "react";
import { Button } from "../ui/button";
import RocketSvg from "@/public/Rocket.svg"; // import the animated SVG
import { ArrowRightIcon, Gift } from "lucide-react";
import Image from "next/image";
import GithubCode from "./GithubCode";
import Link from "next/link";

const HomeComponent = () => {
  return (
    <div className=" flex flex-1 items-center justify-between">
      <div className="flex flex-col justify-center items-start gap-6 md:max-w-[50%] max-w-full">
        <h1 className="font-extrabold text-[#1A1818] dark:text-[#ffffff] text-3xl lg:text-5xl tracking-tight md:-mb-4 flex flex-col gap-3 items-center lg:items-start">
          <span className="relative">Welcome to <span className="text-[#08BD80]">CODESNIPPET</span></span>
        </h1>
        <h2 className="font-bold text-[#6B7280] dark:text-[#A1A1AA] text-xl lg:text-3xl tracking-light flex-col items-center lg:items-start">
        Your Complete Learning Platform!
        </h2>

        <p className="text-lg font-semibold opacity-80 leading-relaxed text-[#374151] dark:text-[#71717A]">
        Explore Live-Courses, Organized Tutorials , Weekly Workshops , Explore Blog , Master CS Concepts, Design Systems Sharpen Your Skills and Ace Interviews with Confidence.
        </p>
      <Link href="/dashboard">
        <Button
          variant={"brand"}
          className="flex items-center justify-center gap-3 font-bold text-md w-full"
        >
          Get Started <ArrowRightIcon className="w-6 h-6" />
        </Button>
        </Link>
        
      </div>

      <div className="hidden md:flex max-w-[50%] flex-col items-center justify-center gap-7">
        <Image
          src="/Home-page3.svg"
          height={1080}
          width={1080}
          alt="Home-Wallpaper"
          className="w-full max-w-xl  ml-auto"
        />

      </div>
    </div>
  );
};

export default HomeComponent;
