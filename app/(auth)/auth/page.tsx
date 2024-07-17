import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { LoginButton } from "@/components/Auth/LoginButton";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const AuthPage = () => {
  return (
    <div className="flex flex-col justify-center items-center  space-y-6">
      <Image src={"/logo.svg"} width={260} height={260} alt={"LaunchFast"} />

      <Image
        src={"/AuthHome.svg"}
        width={980}
        height={980}
        alt="Home-Wallpaper"
        className="w-full max-w-md  ml-auto"
      />
      <p className="text-white">
        A simple authentication service with NextAuth.js and Prisma
      </p>
      <LoginButton>
        <Button variant={"brand"} size={"lg"} className="font-bold text-base">
          Sign In
        </Button>
      </LoginButton>
    </div>
  );
};

export default AuthPage;
